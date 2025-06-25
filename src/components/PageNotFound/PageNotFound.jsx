import React from 'react';
import "./PageNotFound.css";
import { FlexMobiusWrapper } from '../index.jsx';

const PageNotFound = () => {
  return (
    <div className='pageNotFound'>
        <FlexMobiusWrapper
                wrapperWidth="60rem"
                wrapperHeight="40rem"
                stripWidth="30rem"
                heading="404"
                text="Something went wrong!"
        />
    </div>
  )
}

export default PageNotFound;
