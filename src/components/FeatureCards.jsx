import "./FeatureCards.css";
import { cardValues } from "../constants";
import { useNavigate } from 'react-router-dom';
const FeatureCards = () => {
    const navigate = useNavigate();
    return (
        <div className="feature-cards">

            {cardValues.map((card, index) => (
                <div className="each-card" onClick={ ()=>navigate('/services')} >
                    <div className="card-top">
                        <div className="card-image">
                            <img src={card.img} alt="card1" />
                        </div>
                        <div className="card-title font-subheading-black">
                            {card.title}
                        </div>
                    </div>
                    <div className="card-text font-paragraph-black-light">
                        {card.cardText}
                    </div>
                </div>
            ))}

        </div>
        
    );
};

export default FeatureCards;