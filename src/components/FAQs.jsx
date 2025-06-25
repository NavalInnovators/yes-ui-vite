import "./FAQs.css";
import React, { useState } from 'react';
import { YesLogoNoTextLightBG, DownArrow } from "../assets";
import { faqsData } from "../constants";

const FAQs = () => {

    const [selected, setSelected] = useState(0);

    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null);
        }
        setSelected(i);
    };


    return (
        <div className="faqs">

            <div className="faq-left">
                <img className="yes-img-white-bg" src={YesLogoNoTextLightBG} alt="yesLogo" />
                <div className="faq-heading font-heading-black">
                    Frequently asked questions
                </div>
            </div>

            <div className="faq-right">
                {faqsData.map((faq, i) => (
                    <div className="faq-item" key={i}>
                        <div className="faq-question" onClick={() => toggle(i)}>
                            {faq.question}
                            <span className={selected === i ? 'faq-icon rotated' : 'faq-icon'}>
                                <img src={DownArrow} alt="down arrow" />
                            </span>
                        </div>
                        <div className={selected === i ? 'faq-answer show' : 'faq-answer'}>
                            <p className="font-paragraph-white-light">{faq.answer}</p>
                        </div>
                        {i !== faqsData.length - 1 && <hr />}
                        {/* Add a horizontal line after each FAQ item except the last one */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQs;