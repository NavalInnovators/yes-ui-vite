import React from 'react'
import "./BookDashboardUnitsResponsiveUnitDropdown.css"
// import { set } from 'react-datepicker/dist/date_utils';

function BookDashboardUnitsResponsiveUnitDropdown({selectedUnit, setSelectedUnit}) {
  const handleChange = (e)=>{
    setSelectedUnit(Number(e.target.value));
  }
  return (
    <div className="units-section-unit-dropdown">
      <select name="" className="units-section-unit-dropdown-select"
      value={selectedUnit} onChange={handleChange}>
        <option value="1">Unit 1</option>
        <option value="2">Unit 2</option>
        <option value="3">Unit 3</option>
        <option value="4">Unit 4</option>
        <option value="5">Unit 5</option>
      </select>
    </div>
  );
}

export default BookDashboardUnitsResponsiveUnitDropdown