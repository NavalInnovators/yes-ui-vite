import "./Footer.css";
import { logo, RightArrow, MobiusStrip, LogoNI } from "../assets";
import React, { useState } from "react";
import { footerLinks } from "../constants";
import { trackSocialLinkClicked } from "../utils/analytics";
// import { useNavigate } from 'react-router-dom';

const Footer = () => {
    // const navigate = useNavigate();
    // State to hold the email input value
    const [email, setEmail] = useState("");

    // State to track if the checkbox is checked
    const [isChecked, setIsChecked] = useState(false);

    // Handler for email input change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Handler for checkbox change
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        alert(`Form submitted with Email: ${email}`);
    };

    return (
        <div className="footer">
            <div className="upper-footer">
                <div className="logo-section">
                    <img src={logo} alt="yes-logo" />
                    <a
                        href="mailto:info@navalinnovators.com"
                        className="company-email-btn"
                        onClick={() =>
                            trackSocialLinkClicked({
                                platform: "email",
                                location: "footer",
                                url: "mailto:info@navalinnovators.com",
                            })
                        }
                    >
                        info@navalinnovators.com
                    </a>
                </div>

                <form onSubmit={handleSubmit} className="newsletter-section">
                    <div className="newsletter-heading">
                        Stay up to date with YES news & updates!
                    </div>

                    <div className="newsletter-email-btn">
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter Email"
                            required // Makes the email field required
                        />

                        <div>
                            <button type="submit" disabled={!isChecked}>
                                <img src={RightArrow} alt="right-arrow" />
                            </button>
                        </div>
                    </div>
                    <div className="newsletter-checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                required // Makes the checkbox required
                            />
                        </label>
                        <div>I accept the Privacy Policy</div>
                    </div>
                </form>

                <div className="all-links-section">
                    {footerLinks.map((header, innerLinks) => (
                        <div className="each-link-segment" key={header.header}>
                            <div className="font-colourful-border-btn">
                                {header.header}
                            </div>
                            {header.innerLinks.map((title) => (
                                <a
                                    key={title.id}
                                    href={title.id}
                                    className="inner-links"
                                    target={
                                        header.header.toLowerCase() ===
                                        "connect"
                                            ? "_blank"
                                            : "_self"
                                    }
                                    rel={
                                        header.header.toLowerCase() ===
                                        "connect"
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    onClick={() => {
                                        if (
                                            header.header.toLowerCase() ===
                                            "connect"
                                        ) {
                                            trackSocialLinkClicked({
                                                platform:
                                                    title.title.toLowerCase(),
                                                location: "footer",
                                                url: title.id,
                                            });
                                        }
                                    }}
                                >
                                    {title.title}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="lower-footer">
                {/* TODO : NAVIGATE TO https://www.navalinnovators.com/ */}
                <div className="product-by">
                    <img src={MobiusStrip} alt="logoNI" />
                    <div className="product-by-text">
                        <div className="heading-small">Product by</div>
                        <img src={LogoNI} alt="naval innovators" />
                    </div>
                </div>
                <div className="copywrite">
                    {" "}
                    Copyright @2025 All rights reserved
                </div>
            </div>
        </div>
    );
};

export default Footer;
