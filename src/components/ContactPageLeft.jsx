// import "./ContactPageLeft.css";
import "./ContactPageLeft.css";
import { facebook, gmail, insta, linkedin, twitter, youtube } from "../assets";
import { trackSocialLinkClicked } from "../utils/analytics";

function ContactPageLeft() {
  return (
    <div className="contact-page-left-container">
      <div className="contact-page-heading-left">
        Feel free to text us. We are here to help you!
      </div>
      <div className="parent-contact-page-email-section">
        {/* <img
          src={gmail}
          alt="Gmail Icon"
          onClick={() => window.open("mailto:info@yourexamsaathi.com")}
        /> */}

        {/* Email card */}
        <div
          className="contact-email-card"
          onClick={() => {
            trackSocialLinkClicked({
              platform: "email",
              location: "contacts_page",
              url: "mailto:info@navalinnovators.com",
            });
            window.open("mailto:info@navalinnovators.com");
          }}
        >
          <img src={gmail} alt="Gmail Icon" />
          <div className="email-text-section">
            <span className="email-subtext">Email us here</span>
            <span className="email-main">info@navalinnovators.com</span>
          </div>
        </div>

        <div className="contact-page-app-icons">
          <img
            src={insta}
            alt="Instagram Icon"
            onClick={() => {
              trackSocialLinkClicked({
                platform: "instagram",
                location: "contacts_page",
                url: "https://www.instagram.com/yourexamsaathi/",
              });
              window.open("https://www.instagram.com/yourexamsaathi/");
            }}
          />
          <img
            src={linkedin}
            alt="LinkedIn Icon"
            onClick={() => {
              trackSocialLinkClicked({
                platform: "linkedin",
                location: "contacts_page",
                url: "https://www.linkedin.com/company/yourexamsaathi",
              });
              window.open("https://www.linkedin.com/company/yourexamsaathi");
            }}
          />

          <img
            src={youtube}
            alt="Youtube Icon"
            onClick={() => {
              trackSocialLinkClicked({
                platform: "youtube",
                location: "contacts_page",
                url: "https://www.youtube.com/@yourexamsaathi-yes",
              });
              window.open("https://www.youtube.com/@yourexamsaathi-yes");
            }}
          />

          <img
            src={twitter}
            alt="X Icon"
            onClick={() => {
              trackSocialLinkClicked({
                platform: "x",
                location: "contacts_page",
                url: "https://x.com/yourexamsaathi",
              });
              window.open("https://x.com/yourexamsaathi");
            }}
          />
          <img
            src={facebook}
            alt="Facebook Icon"
            onClick={() => {
              trackSocialLinkClicked({
                platform: "facebook",
                location: "contacts_page",
                url: "https://www.facebook.com/profile.php?id=61579173974246",
              });
              window.open(
                "https://www.facebook.com/profile.php?id=61579173974246",
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ContactPageLeft;
