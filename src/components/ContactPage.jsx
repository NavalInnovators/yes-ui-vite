import React from "react";
import "./ContactPage.css";
import ContactPageLeft from "./ContactPageLeft";
import ContactPageRight from "./ContactPageRight";

function ContactPage() {
  return (
    <div className="contact-page-parent-container">
      <ContactPageLeft />
      <ContactPageRight />
    </div>
  );
}

export default ContactPage;
