import React from 'react';
import "./PaymentCompletion.css";
import { FlexMobiusWrapper } from '../index.jsx';
import { useNavigate } from 'react-router-dom';

const PaymentCompletion = () => {

  const navigate = useNavigate();

  return (
    <div className='paymentCompletion'>
      <FlexMobiusWrapper
        wrapperWidth="60rem"
        wrapperHeight="40rem"
        stripWidth="30rem"
        heading="Thank You!"
        text="Your payment has been completed successfully."
      />
      <button onClick={() => navigate("/user-dashboard")} className="colourful-border-btn paymentCompletionBtn">
        Goto Your Courses
      </button>
    </div>
  );
};

export default PaymentCompletion;
