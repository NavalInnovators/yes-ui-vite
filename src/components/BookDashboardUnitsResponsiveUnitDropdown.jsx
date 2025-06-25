import React from 'react'
import "./BookDashboardUnitsResponsiveUnitDropdown.css"

function BookDashboardUnitsResponsiveUnitDropdown() {
  return (
    <div className="units-section-unit-dropdown">
      <select name="" class="units-section-unit-dropdown-select">
        <option value="none" data-percentage="75%">
          Unit 1
        </option>
        <option value="option2">Unit 2</option>
        <option value="option1">Unit 3</option>
        <option value="option2">Unit 4</option>
        <option value="option1">Unit 5</option>
      </select>
    </div>
  );
}

export default BookDashboardUnitsResponsiveUnitDropdown