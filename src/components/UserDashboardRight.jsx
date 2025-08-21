import React from "react";
import "./UserDashboardRight.css";

const UserDashboardRight = ({
  categories = [],
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="userdasbord-right-section">
      <div className="font-colourful-border-btn">
        Categories of what are you looking for
      </div>
      <div className="categories-container">
        <div className="categories-scroll">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`category-item pointer-cursor ${
                selectedCategory === category ? "category-item-active" : ""
              }`}
              onClick={() => onCategorySelect?.(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardRight;
