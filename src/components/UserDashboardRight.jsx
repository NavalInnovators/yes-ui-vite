import React from 'react';
import './UserDashboardRight.css';


const UserDashboardRight = () => {
  const categories = [
    "University Name", "1st Year", "Branch",
    "1st Year", "University Name", "Subject Code",
    "Branch", "1st Year", "Branch"
  ];

  return (
 
    <div className='userdasbord-right-section'>
    <div className='font-colourful-border-btn'>Categories of what are you looking for</div>
     <div className="categories-container">
      
      <div className="categories-scroll">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            {category}
          </div>
        ))}
      </div>
   </div>
    </div>
  );
};

export default UserDashboardRight;
