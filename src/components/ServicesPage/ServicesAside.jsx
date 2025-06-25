import "./ServicesAside.css";
import React from 'react';
import { Link } from "react-router-dom";

const ServicesAside = () => {
  const navbar = document.querySelector('.navbar');
  const navbarHeight = (navbar?.offsetHeight || 0);
  return (
    <aside className="servicesAside">
      {[
        { id: 'syllabus', text: 'Syllabus' },
        { id: 'qna', text: 'Q&A' },
        { id: 'unit', text: 'Unit' },
        { id: 'insights', text: 'Insights' },
        { id: 'maps', text: 'Maps' },
        { id: 'custom-preparation', text: 'Custom Preparation' },
        { id: 'ai-featured', text: 'AI Featured' }
      ].map(({ id, text }) => (
        <Link
          to={`/services#${id}`}
          smooth={true}
          offset={-navbarHeight}
          className="asideLink"
          tabIndex="0"
        >
          {text}
        </Link>
      ))}
    </aside>
  );
};

export default ServicesAside;
