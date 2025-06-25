import { useNavigate } from "react-router-dom";
import "./ServicesMainArticle.css";
import React from 'react';

const ServicesMainArticle = ({ heading, content, btnDestination, image }) => {
  // for navigation on any article's btn click
  const navigate = useNavigate();
  
  // for giving the articles an id for scrolling to
  const formattedId = heading
    .toLowerCase()
    .replace(/[\s&]/g, (match) => (match === ' ' ? '-' : 'n'));


  // Function to add two <br> tags after 65 words and at the next full stop.
  const formatContentWithBreaks = (text, wordsPerChunk) => {
    const words = text.split(' ');
    let result = [];
    let tempChunk = [];

    for (let i = 0; i < words.length; i++) {
      tempChunk.push(words[i]);
      if (tempChunk.length >= wordsPerChunk && words[i].endsWith('.')) {
        result.push(tempChunk.join(' '));
        tempChunk = [];
      }
    }

    // Add remaining words if any
    if (tempChunk.length > 0) {
      result.push(tempChunk.join(' '));
    }

    // Map chunks to JSX with double <br />
    return result.map((chunk, index) => (
      <React.Fragment key={index}>
        {chunk}
        <br />
        <br />
      </React.Fragment>
    ));
  };
  return (
    <article 
      className='servicesMainArticle'>
      <h2 className='servicesMainArticleTitle' id={formattedId}>{heading}</h2>
      <p className='servicesMainArticleContent'>{formatContentWithBreaks(content, 65)}</p>
      {image && <img src={image} className='servicesMainArticleImg' alt="" />}
      <button onClick={() => {navigate(btnDestination)}} className="colourful-border-btn servicesMainArticleBtn">
        Try it Now
      </button>
    </article>
  );
};

export default ServicesMainArticle;
