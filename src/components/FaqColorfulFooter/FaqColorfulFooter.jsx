import "./FaqColorfulFooter.css";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { trackContactFormSubmitted } from "../../utils/analytics";
function FaqColorfulFooter() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        subject: "",
        question: "",
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

        // Validation
        let errors = {};

        // Email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            errors.email = "Please enter a valid email.";
        }

        // Phone validation (exactly 10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!formData.phone) {
            errors.phone = "Phone number is required.";
        } else if (!phoneRegex.test(formData.phone)) {
            errors.phone = "Please enter a valid 10-digit phone number.";
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            // Sending Email using EmailJS
            emailjs
                .send(
                    "service_xqrytv5", // Replace with your EmailJS Service ID
                    "template_f2s5jpq", // Replace with your EmailJS Template ID
                    {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        phone: formData.phone,
                        email: formData.email,
                        subject: formData.subject,
                        question: formData.question,
                    },
                    "zmdx6lUTZLqDyXlsw", // Replace with your EmailJS Public Key
                )
                .then(
                    () => {
                        // Track contact form submission
                        trackContactFormSubmitted({
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            phone: formData.phone,
                            email: formData.email,
                            subject: formData.subject,
                            location: "faq_page",
                        });

                        alert("Your question has been submitted successfully!");
                        setFormData({
                            firstName: "",
                            lastName: "",
                            phone: "",
                            email: "",
                            subject: "",
                            question: "",
                        });
                    },
                    (error) => {
                        alert("An error occurred. Please try again.");
                        console.error(error);
                    },
                );
        }
    };

    return (
        <div className="container2 bg-animation">
            <div className="form-section">
                <div className="form-section-text1">
                    {" "}
                    Didn't find your answer?
                </div>
                <div className="form-section-text2"> Post your question!</div>
                <div className="form-section-text3">
                    We will get back to you absolutely as soon as possible!
                </div>
            </div>
            <div className="faq-contact-form-container">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="first-name"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />

                        <input
                            type="text"
                            className="last-name"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <input
                        type="tel"
                        className="phone"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                    {formErrors.phone && (
                        <p className="error">{formErrors.phone}</p>
                    )}
                    <input
                        type="email"
                        className="email-footer"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    {formErrors.email && (
                        <p className="error">{formErrors.email}</p>
                    )}
                    <input
                        type="text"
                        className="subject"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                    />
                    <textarea
                        className="question"
                        name="question"
                        placeholder="Your Question"
                        rows="4"
                        value={formData.question}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                    <div className="faq-submit-button">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FaqColorfulFooter;
