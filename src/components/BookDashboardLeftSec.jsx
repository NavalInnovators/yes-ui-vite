import React from "react";
import "./BookDashboardLeftSec.css";
import { useBookDashboard } from "../context/book-dashboard-context";

const units = [
  {
    name: "Unit 1",
    num: "1",
  },
  {
    name: "Unit 2",
    num: "2",
  },
  {
    name: "Unit 3",
    num: "3",
  },
  {
    name: "Unit 4",
    num: "4",
  },
  {
    name: "Unit 5",
    num: "5",
  },
];

function BookDashboardLeftSec() {
  const { selectedUnit, setSelectedUnit } = useBookDashboard(); // Adjust to match your context keys.

  //Ensure Unit 1 is selected by default
  React.useEffect(() => {
    if (!selectedUnit) {
      setSelectedUnit("1");
    }
  }, [selectedUnit, setSelectedUnit]);

  return (
    <div className="book-dashboard-left-sec">
      {/* Desktop sidebar */}
      <nav className="book-dashboard-unit-bar">
        <ul>
          {units.map((u) => (
            <li
              key={u.name}
              onClick={() => setSelectedUnit(u.num)}
              className={u.num === selectedUnit ? "active-unit" : ""}
            >
              {u.name}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Dropdown */}
      <div className="mobile-unit-dropdown">
        <select
          value={selectedUnit}
          onChange={(e) => setSelectedUnit(e.target.value)}
          id="mobile-unit-select"
        >
          {units.map((u) => (
            <option key={u.num} value={u.num}>
              {u.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default BookDashboardLeftSec;
