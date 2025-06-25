import React from "react";
import "./BookDashboardResponsiveUnitDropdown.css";

function BookDashboardResponsiveUnitDropdown() {
  return (
    <div className="unit-dropdown">
      <select className="units-dropdown common-css-dropdown">
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

export default BookDashboardResponsiveUnitDropdown;
