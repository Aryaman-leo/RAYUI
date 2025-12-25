import React, { useState, useMemo, useRef } from "react";
import Input from "./Input";
import Tag from "./Tag";
import "./JobPreferencesSelector.css";
import { ROLE_GROUPS } from "../../utils/jobPreferences";

// Performance optimization: Memoize ROLE_GROUPS to prevent recreation
const groups = ROLE_GROUPS;
   
// Performance optimization: Memoize the component to prevent unnecessary re-renders
const JobPreferencesSelector = React.memo(function JobPreferencesSelector({
  selectedRoles,
  setSelectedRoles,
  error,
  mode,
  hideSelectedDisplay = false,
  useDashedStyle = false,
}) {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(groups[0].heading);
  const inputRef = useRef();
  const dropdownRef = useRef();

  // Filtered groups for dropdown
  const filteredGroups = useMemo(() => {
    if (!search.trim()) return groups;
    const lower = search.toLowerCase();
    return groups
      .map((g) => ({
        ...g,
        roles: g.roles.filter((role) => role.toLowerCase().includes(lower)),
      }))
      .filter((g) => g.roles.length > 0);
  }, [search]);

  // Roles for the active group (filtered)
  const activeGroupObj =
    filteredGroups.find((g) => g.heading === activeGroup) || filteredGroups[0];
  const activeRoles = activeGroupObj ? activeGroupObj.roles : [];

  // Handle outside click to close dropdown
  React.useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  const handleRoleClick = (role) => {
    if (mode === "preview") return;
    const currentRoles = Array.isArray(selectedRoles) ? selectedRoles : [];
    if (currentRoles.includes(role)) {
      setSelectedRoles(currentRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...currentRoles, role]);
    }
  };

  // Handle input change and open dropdown only when user types
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    // Only open dropdown if user is actually typing
    if (value.trim()) {
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
    }
  };

  // Handle click to open dropdown
  const handleInputClick = () => {
    if (!dropdownOpen) {
      setDropdownOpen(true);
    }
  };

  return (
    <div className="job-pref-selector-container">
      <div className="job-pref-selector-header">
        <Input
          ref={inputRef}
          className="job-pref-selector-search"
          placeholder="Enter job title"
          value={search}
          variant="rounded"
          onClick={handleInputClick}
          onChange={handleInputChange}
          disabled={mode === "preview"}
          style={{
            border: mode === "filter" ? '1px dashed #d1d5db' : '1px solid #d1d5db',
            borderRadius: mode === "filter" ? '12px' : '48px',
            background: 'white',
            fontSize: '14px',
            color: '#374151',
            padding: '8px 12px',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s'
          }}
        />
        {dropdownOpen && (
          <div className="job-pref-dropdown" ref={dropdownRef}>
            <div className="job-pref-dropdown-cols">
              <div className="job-pref-dropdown-groups">
                {filteredGroups.map((g) => (
                  <div
                    key={g.heading}
                    className={`job-pref-dropdown-group${
                      g.heading === activeGroup ? " selected" : ""
                    }`}
                    onClick={() => setActiveGroup(g.heading)}
                  >
                    {g.heading}
                  </div>
                ))}
              </div>
              <div className="job-pref-dropdown-roles p-2 flex flex-wrap gap-1">
                {activeRoles.length > 0 ? (
                  activeRoles.map((role) => (
                    <div
                      key={role}
                      className={`job-pref-selector-role cursor-pointer${
                        (Array.isArray(selectedRoles) ? selectedRoles : []).includes(role)
                          ? " selected-dropdown-role"
                          : ""
                      }`}
                      onClick={() => handleRoleClick(role)}
                    >
                      {role}
                    </div>
                  ))
                ) : (
                  <div className="job-pref-selector-role-empty">
                    No roles found
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Selected roles display using Tag component */}
      {!hideSelectedDisplay && !dropdownOpen && Array.isArray(selectedRoles) && selectedRoles.length > 0 && (
        <div className="selected-roles-simple mt-3">
          <div className="flex flex-wrap gap-2">
            {selectedRoles.map((role) => (
              <Tag
                key={role}
                onRemove={() => {
                  // Remove from actual selected roles, not temp
                  const currentRoles = Array.isArray(selectedRoles) ? selectedRoles : [];
                  setSelectedRoles(currentRoles.filter((r) => r !== role));
                }}
              >
                {role}
              </Tag>
            ))}
          </div>
        </div>
      )}
      {/* Error display removed - handled by parent component */}
    </div>
  );
});

export default JobPreferencesSelector;
