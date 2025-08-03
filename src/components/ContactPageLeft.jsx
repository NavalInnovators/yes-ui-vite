// import "./ContactPageLeft.css";
import "./ContactPageLeft.css";
import {
  facebook,
  gmail,
  insta,
  linkedin,
  twitter,
  youtube,
  mailLogo,
} from "../assets";

function ContactPageLeft() {
  return (
    <div className="contact-page-left-container">
      <div className="contact-page-heading-left">
        Feel free to text us. We are here to help you!
      </div>
      <div className="parent-contact-page-email-section">
        {/* <div className="contact-page-email-section"> */}
        {/* <a href="mailto:info@yourexamsaathi.com"> */}
        <div class="email-card">
          <img src={mailLogo} alt="Gmail Icon" />
          <div class="email-text">
            <p class="label">Email us here</p>
            <a href="info@navalinnovators.com">info@navalinnovators.com</a>
          </div>
        </div>

        {/* <img
          src={gmail}
          alt="Gmail Icon"
          onClick={() => window.open("info@navalinnovators.com")}
        /> */}
        {/* </a> */}
        {/* </div> */}
        <div className="contact-page-app-icons">
          {/* <img
            src={facebook}
            alt="Facebook Icon"
            onClick={() => window.open("https://www.yourexamsaathi.com/")}
            aria-label="Open Facebook"
          /> */}
          <img
            src={insta}
            alt="Instagram Icon"
            onClick={() =>
              window.open("https://www.instagram.com/navalinnovators")
            }
          />
          <img
            src={linkedin}
            alt="LinkedIn Icon"
            onClick={() =>
              window.open("https://www.linkedin.com/company/yourexamsaathi")
            }
          />
          {/* <img
            src={twitter}
            alt="Twitter Icon"
            onClick={() => window.open("https://www.yourexamsaathi.com/")}
          /> */}
          <img
            src={youtube}
            alt="Youtube Icon"
            onClick={() =>
              window.open("https://www.youtube.com/@navalinnovators")
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ContactPageLeft;
