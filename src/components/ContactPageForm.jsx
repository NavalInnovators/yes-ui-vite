import React, { useState } from "react";
import emailjs from "emailjs-com"; // Import emailjs
import { trackContactFormSubmitted } from "../utils/analytics";
import "./ContactPageForm.css";
import AlertModal from "./AlertModal";

function ContactPageForm() {
  const [alertConfig, setAlertConfig] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    phone: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple form validation
    let errors = {};

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email.";
    }

    // Phone number validation (should be exactly 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone) {
      errors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number.";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Send email using EmailJS
      emailjs
        .sendForm(
          "service_xqrytv5", // Your service ID
          "template_f2s5jpq", // Your template ID
          e.target, // The form element
          "zmdx6lUTZLqDyXlsw", // Your user ID from EmailJS
        )
        .then(
          (result) => {
            // Track contact form submission
            trackContactFormSubmitted({
              firstName: formData.firstName,
              lastName: formData.lastName,
              phone: formData.phone,
              email: formData.email,
              subject: formData.subject,
              location: "contacts_page",
            });

            // alert("Thanks for your message! We will get back to you soon.");
            setAlertConfig({
              title: "Success!",
              message: "Thanks for your message! We will get back to you soon.",
              variant: "green"
            });

            setFormData({
              firstName: "",
              lastName: "",
              phone: "",
              email: "",
              subject: "",
              message: "",
            });
          },
          (error) => {
            console.log("Error: " + error.text);
            // alert("Form was not submitted due to an error. Please try afer some time.")
            setAlertConfig({
              title: "Submission Failed",
              message: "Form was not submitted due to an error. Please try again later.",
              variant: "red"
            });
          },
        );
    }
  };

  return (
    <div className="parent-div-form-container-contact-page">
      <form onSubmit={handleSubmit} className="contact-page-form-container">
        <div className="contact-page-first-row">
          <input
            type="text"
            placeholder="First Name"
            required
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <input
          type="tel"
          placeholder="Phone"
          required
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        {formErrors.phone && <p className="error">{formErrors.phone}</p>}
        <input
          type="email"
          id="contact-page-input-email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        {formErrors.email && <p className="error">{formErrors.email}</p>}

        <input
          type="text"
          id="contact-page-input-subject"
          placeholder="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          required
        />

        <textarea
          placeholder="Message"
          rows="4"
          required
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          className="contact-us-textarea-form "
        ></textarea>
        <button className="colourful-border-btn contact-page-btn" type="submit">
          Submit
        </button>
      </form>

      {alertConfig && (
        <AlertModal
          title={alertConfig.title}
          message={alertConfig.message}
          variant={alertConfig.variant}
          onClose={() => setAlertConfig(null)} // This cleans up the state so it can open again later
        />
      )}
    </div>
  );
}

export default ContactPageForm;
