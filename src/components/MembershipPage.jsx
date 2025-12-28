import React from "react";
import "./MembershipPage.css";
import CTA from "./CTA";
import { vector, img1, img2, YesLogoNoTextLightBG, dropdown } from "../assets";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

// --- Data for your plans and features ---
const pricingPlans = [
  {
    icon: img1,
    title: "Free Plan",
    price: "₹0",
    period: "/Subject",
    buttonText: "Get Started",
    features: [
      "Free Syllabus access",
      "Free Detailed answers of PYQ",
      "Notes Access - 1 Unit",
      "Insights Access - 1 Unit",
      "50 Summarisations And Rephrases",
    ],
  },
  {
    icon: img2,
    title: "Basic Plan",
    price: "₹110",
    period: "/Subject",
    buttonText: "Get Started",
    features: [
      "All Free features +",
      "Unlimited Summarisations",
      "Unlimited Rephrasal",
      "Notes Access - All Units",
      "Insights Access - All Units",
    ],
  },
  {
    icon: img2,
    title: "Pro Plan",
    price: "₹150",
    period: "/Subject",
    buttonText: "Get Started",
    isPopular: true, // CHANGE: Pro Plan is now "Most Popular"
    features: [
      "All Basic features +",
      "Personalised Roadmap",
      // "AI Chatbot access",
      "Quicker query resolution",
      "Enjoy our Premium features",

    ],
  },
];

const featuresData = [
  { feature: 'Syllabus Access', free: true, basic: true, pro: true },
  { feature: 'PYQ - Detail Answers', free: true, basic: true, pro: true },
  { feature: 'Notes Access', free: '1 Unit', basic: 'All Units', pro: 'All Units' },
  { feature: 'Insights Access', free: '1 Unit', basic: 'All Units', pro: 'All Units' },
  { feature: 'Summariser', free: '50 Total', basic: 'Unlimited', pro: 'Unlimited' },
  { feature: 'Rephraser', free: '50 Total', basic: 'Unlimited', pro: 'Unlimited' },
  { feature: 'Personalised Roadmap', free: false, basic: false, pro: true },
  // { feature: 'AI Chatbot Access', free: false, basic: false, pro: true },
];

const faqData = [
  {
    id: "faq1",
    question: "What are the benefits of becoming a Premium Member?",
    answer: "Premium Membership offers unlimited access to all our features, including unlimited summarizations, rephrasing, mind maps, tricks, and tips. You’ll also gain access to full analytics, predictive question trends, and exclusive filters. Additionally, you’ll get a free trial of the Customized Preparation and AI Features, enhancing your exam prep experience.",
  },
  {
    id: "faq2",
    question: "What is included in the Free Membership plan?",
    answer: "The Free Membership plan gives you access to basic features like the syllabus, previous year’s questions with answers, and 50 free summarizations/rephrases. You’ll also get limited access to tricks, maps, and a few other essential resources to help with your exam preparation.",
  },
  // Add other FAQs here...
];


function MembershipPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  // Helper function to render table cell content with icons
  const renderFeatureCheck = (value) => {
    if (value === true) return <span className="tick">✔</span>;
    if (value === false) return <span className="cross">✖</span>;
    return value;
  };

  return (
    <div className="membership-page">
      {/* Section 1: Header and Pricing Cards */}
      <header className="membership-header">
        <div className="container">
          <h1 className="header-title">Pricing</h1>
          <div className="pricing-cards-container">
            {pricingPlans.map((plan) => (
              <div key={plan.title} className={`pricing-card ${plan.isPopular ? 'popular' : ''}`}>
                {plan.isPopular && <div className="popular-badge">Most Popular</div>}
                <img className="card-icon" src={plan.icon} alt={`${plan.title} icon`} />
                <h3 className="card-title">{plan.title}</h3>
                <p className="card-price">
                  {plan.price}<span className="card-period">{plan.period}</span>
                </p>
                <button className="card-button" onClick={isLoggedIn ? () => navigate('/all-subjects') : () => navigate('/login')} >
                  {plan.buttonText}
                </button>
                <hr className="card-divider" />
                <ul className="features-list">
                  {plan.features.map((feature, index) => (
                    <li key={index}>
                      <img src={vector} alt="check mark" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="container page-content">
        {/* Section 2: Introductory Paragraph */}
        <section className="intro-section">
          <div className="intro-text">
            <h2>Unlock Your Path to Success with Our Membership Plans</h2>
          </div>
          <div className="intro-description">
            <p>
              Unlock the full potential of your exam preparation with our exclusive membership plans! At Your Exam Saathi, we offer a range of affordable and flexible membership options designed to suit every student’s needs. With our membership, you get unlimited access to personalized study plans, AI-driven insights, targeted question banks, and a wealth of resources tailored to help you succeed.
              <br /><br />
              No matter your study schedule, our platform adapts to fit your pace, ensuring maximum efficiency and results. By choosing a membership, you’re investing in smarter, faster, and more effective preparation that will give you the edge in your exams. Don’t just prepare—prepare to excel!
            </p>
            <img src={YesLogoNoTextLightBG} alt="YES Logo Background" className="intro-bg-logo" />
          </div>
        </section>

        {/* Section 3: Features Comparison Table (NEW) */}
        <section className="feature-comparison-section">
          <h2>Compare Our Plans</h2>
          <div className="feature-table-wrapper">
            <table className="feature-table">
              <thead>
                <tr>
                  <th>Features</th>
                  <th>Free Plan</th>
                  <th>Basic Plan</th>
                  <th>Pro Plan</th>
                </tr>
              </thead>
              <tbody>
                {featuresData.map((item, index) => (
                  <tr key={index}>
                    <td data-label="Feature">{item.feature}</td>
                    <td data-label="Free Plan">{renderFeatureCheck(item.free)}</td>
                    <td data-label="Basic Plan">{renderFeatureCheck(item.basic)}</td>
                    <td data-label="Pro Plan">{renderFeatureCheck(item.pro)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: "Who is this for?" (NEW) */}
        <section className="who-is-this-for-section">
          <h2>Who is this for?</h2>
          <div className="audience-cards-container">
            <div className="audience-card">
              <h4>Free Plan</h4>
              <p>Perfect for new users who want to explore our basic features for a single subject and get a feel for the platform.</p>
            </div>
            <div className="audience-card">
              <h4>Basic Plan</h4>
              <p>The ideal choice for students actively preparing for exams who need unlimited access to core study materials and tools.</p>
            </div>
            <div className="audience-card">
              <h4>Pro Plan</h4>
              <p>Designed for the dedicated student seeking a fully personalized, AI-driven learning experience to maximize their score.</p>
            </div>
          </div>
        </section>

        {/* Section 5: Testimonials (Placeholder for you) */}
        {/* <YourTestimonialsComponent /> */}

        {/* Section 6: FAQ */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <ul className="accordion">
            {faqData.map((faq, index) => (
              <li key={faq.id}>
                <input type="radio" name="accordion" id={faq.id} defaultChecked={index === 0} />
                <label htmlFor={faq.id}>
                  {faq.question}
                  <img src={dropdown} alt="toggle" className="dropdown-icon" />
                </label>
                <div className="content">
                  <p>{faq.answer}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Section 7: CTA (You can import and place your CTA component here) */}
      <CTA />
    </div>
  );
}

export default MembershipPage;
