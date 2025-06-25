import React from 'react';
import './CTA.css';
import { YesLogoNoText } from '../assets';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
  const navigate = useNavigate();
  return (
    <div className="cta-outer">
      <div className="cta-card bg-animation">
        <img src={YesLogoNoText} alt="yes logo" className='cta-bg-img' />
        <div className='cta-content'>
          <div className='cta-heading font-heading-white'>
            Still have a question?
          </div>
          <div className='cta-p font-paragraph-white-light'>
            Feel free to write to us at navalinnovators@gmail.com or contact us by clicking on the following button:
          </div>
          <button onClick={() => navigate("/contacts")} className='transparent-bg-btn font-colourful-border-btn'>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTA;
