import "./Testimonials.css";
import { quoteImg, LeftArrow, RightArrow } from "../assets";
import React, { useRef } from "react";

const Testimonials = () => {

    const containerRef = useRef(null);

    const scrollLeft = () => {
        containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <div className="testimonials">

            <div className="testimonials-title font-heading-black">
                What students say about us!
            </div>
            <div className="testimonials-card" ref={containerRef}>

                <div className="each-testimonial">

                    <div className="testimonials-header">
                        <div className="header-content">

                            <div className="testimonial-name">Ravi Sharma</div>
                            <div className="testimonial-desc">Engineering Student</div>
                        </div>
                        <div className="header-img">
                            <img src={quoteImg} alt="quote" />
                        </div>

                    </div>
                    <div className="testimonials-content">
                    Your Exam Saathi transformed my exam preparation. The AI-driven insights and personalized study plans made a huge difference. I was able to focus on high-probability topics and improve my score significantly!
                    </div>
                </div>

                <div className="each-testimonial">

                    <div className="testimonials-header">
                        <div className="header-content">

                            <div className="testimonial-name">Priya Desai</div>
                            <div className="testimonial-desc">University Student</div>
                        </div>
                        <div className="header-img">
                            <img src={quoteImg} alt="quote" />
                        </div>

                    </div>
                    <div className="testimonials-content">
                    I’ve always struggled with time management while studying. With the customized preparation and time-based question banks, Your Exam Saathi helped me prioritize my weak areas and study smarter, not harder
                    </div>
                </div>

                <div className="each-testimonial">

                    <div className="testimonials-header">
                        <div className="header-content">

                            <div className="testimonial-name">Anil Kumar</div>
                            <div className="testimonial-desc">B.Tech Student, Electrical Engineering</div>
                        </div>
                        <div className="header-img">
                            <img src={quoteImg} alt="quote" />
                        </div>

                    </div>
                    <div className="testimonials-content">
                    The Mind Maps feature was a game-changer for me! It helped me visualize complex topics, making them easier to understand and retain. I feel more confident in my exam preparation now. I was able to learn using the tricks very easily. Even in no time. Thank you YES!
                    </div>
                </div>

                <div className="each-testimonial">

                    <div className="testimonials-header">
                        <div className="header-content">

                            <div className="testimonial-name">Sanya Patel</div>
                            <div className="testimonial-desc">Final Year Engineering Student</div>
                        </div>
                        <div className="header-img">
                            <img src={quoteImg} alt="quote" />
                        </div>

                    </div>
                    <div className="testimonials-content">
                    I’ve tried many study resources, but nothing compares to Your Exam Saathi. The personalized study plans and detailed unit summaries helped me cover everything effectively, even with limited time before exams.
                    </div>
                </div>

                <div className="each-testimonial">

                    <div className="testimonials-header">
                        <div className="header-content">

                            <div className="testimonial-name">Rohan Mehta</div>
                            <div className="testimonial-desc">Community Mentor</div>
                        </div>
                        <div className="header-img">
                            <img src={quoteImg} alt="quote" />
                        </div>

                    </div>
                    <div className="testimonials-content">
                    Your Exam Saathi helped me focus on the most important topics. The Exam Insights feature provided me with trends from past papers, guiding me to focus on the areas most likely to appear in my exams.
                    </div>
                </div>

                <div className="each-testimonial">

                    <div className="testimonials-header">
                        <div className="header-content">

                            <div className="testimonial-name">Aarti Singh</div>
                            <div className="testimonial-desc">Civil Engineering</div>
                        </div>
                        <div className="header-img">
                            <img src={quoteImg} alt="quote" />
                        </div>

                    </div>
                    <div className="testimonials-content">
                    The AI-powered features, especially the QnA and performance analytics, made studying so much easier. I could track my progress, identify weak points, and improve them in time for my exams.
                    </div>
                </div>

                <div className="each-testimonial">

                    <div className="testimonials-header">
                        <div className="header-content">

                            <div className="testimonial-name">Vikram Yadav</div>
                            <div className="testimonial-desc">Engineering Aspirant</div>
                        </div>
                        <div className="header-img">
                            <img src={quoteImg} alt="quote" />
                        </div>

                    </div>
                    <div className="testimonials-content">
                    As someone new to AI-based learning tools, I was amazed at how personalized and efficient the platform was. From detailed notes to tailored practice questions, Your Exam Saathi made my preparation much more organized.
                        Thank you so much YES @yourExamSaathi.
                    </div>
                </div>

                
                
            </div>
            <div className="arrows">
                
                <img src={LeftArrow} alt="left arrow" className="left-arrow" onClick={scrollLeft}/>
                <img src={RightArrow} alt="right arow" className="right-arrow" onClick={scrollRight}/>
                
            </div>
        </div>
    );
};

export default Testimonials;