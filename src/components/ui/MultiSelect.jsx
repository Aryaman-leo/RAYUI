import React from "react"
import CreatableSelect from "react-select/creatable"
import "./MultiSelect.css"

const MultiSelect = ({
  options = [],
  value = [],
  onChange,
  placeholder = "Select options...",
  isDisabled = false,
  isSearchable = true,
  className = "",
  error = false,
  ...props
}) => {
  return (
    <div className={`multi-select-container ${error ? "error" : ""} ${className}`}>
      <CreatableSelect
        isMulti
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        className="multi-select"
        classNamePrefix="select"
        {...props}
      />
    </div>
  )
}

export default MultiSelect 