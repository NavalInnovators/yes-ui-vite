import React from 'react';
import "./ServicesBottomHero.css";
import { useNavigate } from 'react-router-dom';

const ServicesBottomHero = () => {
  const navigate = useNavigate();

  return (
    <div className='servicesBottomHero'>
      {/* <div className="servicesBottomHeroWatermark">
        YES
      </div> */}
      <div className="servicesBottomHeroContent">
        <h2 className="servicesBottomHeroTitle">
            Check Out Free Stuff
        </h2>
        <span className="servicesBottomHeroText">
        We are currently offering you all free last minute resources for your best preparation which include multiple AI features as well.
        </span>
        <button onClick={() => navigate("/user-dashboard")} className="transparent-bg-btn servicesBottomHeroBtn">
            Explore
        </button>
      </div>
    </div>
  )
}

export default ServicesBottomHero;
