import { YesLogoNoTextLightBG} from "../assets";
import React from 'react'
import "./Login.css";

function LoginSignupLeft() {
  return (
    <>
    <div className="img-text-container">
    <img src={YesLogoNoTextLightBG} alt="yesLogo" />
    <div className="login-heading font-heading-black">
      Start your journey with{" "}
    </div>
  </div>
  {/* <div className="login-powered-by-card">
    <img src={MobiusStrip} alt="logoNI" />
    <div className="product-by-text-container">
      <div className="product-by-login-page">Product By</div>
      <div className="company-name-product-by-login-page">
        Naval Innovators
      </div>
    </div>
  </div> */}
  </>
  )
}

export default LoginSignupLeft