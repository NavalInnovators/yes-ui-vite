import FaqColorfulFooter from "../../components/FaqColorfulFooter/FaqColorfulFooter";
import FaqColorfulHeader from "../../components/FaqColorfulHeader/FaqColorfulHeader";
import FaqQuestions from "../../components/FaqQuestions/FaqQuestions";
import "./FAQPage.css";

export default function FAQPage() {
  return (
    <>
      <div className="top-animation">
        <FaqColorfulHeader />
      </div>
      <div className="faq-page-container">
        <FaqQuestions />
      </div>
      <div className="bottom-animation">
        <FaqColorfulFooter />
      </div>

    </>
  )
}
