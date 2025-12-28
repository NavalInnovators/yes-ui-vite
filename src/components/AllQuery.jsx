import "./AllQuery.css";
import React, { useState, useEffect } from "react";
import { CommentIcon, LikeIcon } from "../assets";

function AllQuery() {
  const cards = [1, 2, 3, 4];
  const [currentDate, setCurrentDate] = useState("");
  const [liked, setLiked] = useState(Array(cards.length).fill(false));

  const handleClick = (index) => {
    const updatedLikes = [...liked];
    updatedLikes[index] = !updatedLikes[index];
    setLiked(updatedLikes);
  };

  const handleComment = () => {
    // alert("Comment button clicked!");
    console.log("Comment button clicked!");
  };

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString();
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="all-query-container">
      <div className="gradient-bar">
        <span className="gradient-text">Your Queries</span>
      </div>
      <div className="tabs">
        <button className="Your-answers">Your Answers</button>
        <button className="Subject-query">Submit your query</button>
      </div>
      <div className="sub-container">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <h3 className="card-title">Subject</h3>
            <p className="card-content">
              Lorem ipsum dolor sit amet, consectetuer sed diam nonummy nibh
              euismod lorem ipsum dolor sit ameco. Lorem ipsum dolor sit amet,
              consectetuer sed diam nonummy nibh euismod lorem ipsum dolor sit
              ameco....
            </p>
            <div className="card-footer">
              <div className="date">
                <p className="current-date">{currentDate}</p>
              </div>
              <div className="icons-like-comment">
                <button
                  className={`like-button ${liked[index] ? "liked" : ""}`}
                  onClick={() => handleClick(index)}
                >
                  <img src={LikeIcon} alt="like icon" className="like-icon" />
                </button>
                <button className="comment-button" onClick={handleComment}>
                  <img
                    src={CommentIcon}
                    alt="comment icon"
                    className="comment-icon"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllQuery;
