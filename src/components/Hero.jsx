import './Hero.css';
import { MobiusStrip } from '../assets';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
const Hero = () => {
    const navigate = useNavigate();
    // Short feature words for the typing loop
    const features = ['AI', 'PYQs', 'Summariser', 'Rephraser', 'Notes', 'Chatbot', 'Insights', 'Roadmap'];

    const basePhrase = 'Prep Smarter with our ';
    const typingSpeed = 70;     // ms per character typed
    const deletingSpeed = 40;   // ms per character deleted
    const pauseDelay = 1500;    // pause after full word before deleting

    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);

    useEffect(() => {
        // Respect reduced-motion preference
        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) {
            // show the first feature statically
            setText(features[0]);
            return;
        }

        let timeout;
        const current = features[loopNum % features.length];

        if (!isDeleting) {
            // typing
            if (text.length < current.length) {
                timeout = setTimeout(() => setText(current.substring(0, text.length + 1)), typingSpeed);
            } else {
                // full typed -> wait then start deleting
                timeout = setTimeout(() => setIsDeleting(true), pauseDelay);
            }
        } else {
            // deleting
            if (text.length > 0) {
                timeout = setTimeout(() => setText(current.substring(0, text.length - 1)), deletingSpeed);
            } else {
                // move to next feature and start typing
                setIsDeleting(false);
                setLoopNum(prev => prev + 1);
            }
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, loopNum, features]);


    return (
        <div className="hero">
            <div className='hero-inner'>
                <div className='hero-container'>
                    <div className="hero-img">
                        <img src={MobiusStrip} alt="MobiusStrip" />
                    </div>
                    <div className="hero-text font-heading-black" aria-live="polite">
                        {/* <div>Target AKTU exams with AI</div>
                        <div>Prep Smarter with our Summariser</div> */}
                        <div className="line1">Ace AKTU Exams</div>
                        <div className="line2">
                            {basePhrase}
                            <span className="feature">{text}</span>
                            {/* <span className="typing-cursor" aria-hidden="true">|</span> */}
                        </div>
                    </div>
                </div>

                <div className="hero-about">
                    <div className='hero-btns'>
                        <button onClick={() => navigate('/user-dashboard')} className='colourful-border-btn font-colourful-border-btn'>
                            Start Preparation
                        </button>
                        <button onClick={() => navigate('/membership')} className='colourful-border-btn font-colourful-border-btn'>
                            Watch Quick Demo
                        </button>
                    </div>

                    <div className='hero-description'>
                        <div className="font-paragraph">
                            We use AI to revolutionize engineering exam prep! Get personalized study plans, past paper insights, concise notes, and predictive question trends—all designed to help you excel smarter and faster. Conquer exams with confidence!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;