import './Hero.css';
import { MobiusStrip } from '../assets';
import { useNavigate } from 'react-router-dom';
const Hero = () => {
    const navigate = useNavigate();
    return (
        <div className="hero">
            <div className='hero-inner'>
                <div className='hero-container'>
                    <div className="hero-img">
                        <img src={MobiusStrip} alt="MobiusStrip" />
                    </div>
                    <div className="hero-text font-heading-black">
                        <div>Learning with AI</div>
                        <div>Welcome to Your Exam Saathi</div>
                    </div>
                </div>

                <div className="hero-about">
                    <div className='hero-btns'>
                        <button onClick={()=>navigate('/user-dashboard')} className='colourful-border-btn font-colourful-border-btn'>
                            Try it now
                        </button>
                        <button onClick={()=>navigate('/membership')} className='colourful-border-btn font-colourful-border-btn'>
                            Get subscription
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