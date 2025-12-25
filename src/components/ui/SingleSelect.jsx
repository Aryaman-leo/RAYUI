import React from "react"
import Select from "react-select"
import "./SingleSelect.css"

const SingleSelect = ({
  options = [],
  value = null,
  onChange,
  placeholder = "Select an option...",
  isDisabled = false,
  isSearchable = true,
  className = "",
  error = false,
  formatValueLabel,
  ...props
}) => {
  return (
    <div className={`single-select-container ${error ? "error" : ""} ${className}`}>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        className="single-select"
        classNamePrefix="select"
        formatValueLabel={formatValueLabel}
        {...props}
      />
    </div>
  )
}

export default SingleSelect 