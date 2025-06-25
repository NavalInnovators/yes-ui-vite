import React from "react";
// import ContactPageForm from "./ContactPageForm";
import ContactPageForm from "./ContactPageForm";
import "./ContactPageRight.css";

function ContactPageRight() {
  return (
    <div className="contact-page-right-container">
      <div className="ask-box">
        <div className="contact-page-heading-right">Frequently ask anything to us!</div>
        <div className="contact-page-table-container">
          <ContactPageForm />
        </div>
      </div>
    </div>
  );
}

export default ContactPageRight;
