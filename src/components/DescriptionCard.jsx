import "./DescriptionCard.css";
import { YesLogoNoText } from "../assets";
// import { div } from "three/webgpu";
import { useNavigate } from "react-router-dom";
const DescriptionCard = () => {
  const navigate = useNavigate();
  return (
    <div className="outer-description-card">
      <div className="description-card bg-animation">
        <div className="description-title font-heading-white">
          For Every Student, Every Classroom. Every Doubt.
        </div>
        <div className="below-section">
          <div className="desc-para-font subtext font-paragraph-white-light">
            Every student has unique learning needs, and every classroom
            presents its own challenges. Our product adapts to cater to
            individual doubts, ensuring no one is left behind.
          </div>

          <div className="side-section">
            <img className="yes-img" src={YesLogoNoText} alt=" " />
            <div className="desc-card-text">
              <p className="desc-para-font font-paragraph-white-light">
                At Your Exam Saathi, we understand that every student learns
                differently, and every classroom experience is distinct. Whether
                you’re a fast learner seeking to cover more ground or need extra
                help to grasp difficult concepts, our AI-powered platform adapts
                to meet your specific needs.
              </p>
              <p className="desc-para-font font-paragraph-white-light">
                With personalized study plans, targeted resources, and instant
                solutions to your doubts, we ensure that you get the right
                support at the right time. No matter where you are in your
                academic journey, we are committed to guiding you every step of
                the way, making sure that your doubts are addressed, your
                learning is enhanced, and your path to success is clearer.
              </p>
              <button
                onClick={() => navigate("/company")}
                className="transparent-bg-btn font-colourful-border-btn"
                id="knowMore"
              >
                Know More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionCard;
