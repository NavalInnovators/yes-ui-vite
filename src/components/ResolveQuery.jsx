

// import "./ResolveQuery.css"
// import { BackArrow } from "../assets";
// import { LikeIcon } from "../assets";
// import React, { useState, useEffect } from 'react';
// function ResolveQuery() {
//   const cards = [
//     {
//       subject: "Subject lorem ipsum",
//       question: "Lorem ipsum dolor sit amet, consectetuer sed diam nonummy nibh euismod lorem ipsum dolor sit ipsum dolor sit amet, consectetuer sed diam nonummy nibh euismod lorem ipsum dolor sit ameco.", answer: "Lorem ipsum dolor sit amet, consectetuer sed diam nonummy nibh euismod lorem ipsum dolor sit ipsum dolor sit amet, consectetuer sed diam nonummy nibh euismod lorem ipsum dolor sit ameco.Lorem ipsum dolor sit amemy nibh euismod lorem ipsum dolor sdolor sit amet, consectetuer sed diam nonummy nibh euismod lorem ipsum dolor sit ameco. Lorem ipsum dolor sit ."
//     },

//   ];

//   const [currentDate, setCurrentDate] = useState('');
//   const [liked, setLiked] = useState(Array(cards.length).fill(false));

//   const handleClick = (index) => {
//     const updatedLikes = [...liked];
//     updatedLikes[index] = !updatedLikes[index];
//     setLiked(updatedLikes);
//   };

//   useEffect(() => {
//     const date = new Date();
//     const formattedDate = date.toLocaleDateString();
//     setCurrentDate(formattedDate);
//   }, []);

//   return (
//     <div className="resolve-query-container">
//       <div className="gradient-bar">
//         <span className="gradient-text">View Your Query</span>
//       </div>

      

//       {cards.map((card, index) => (
//         <div className="query" key={index}>
//           <div className="sub-query">
//             <div className="subject">
//               {card.subject}
//             </div>
//             <div className="question">
//               {card.question}
//             </div>
//             <div className="answer">
//               {card.answer}
//             </div>
//             <div className="card-footer">
//               <div className="date">
//                 <p className="current-date">{currentDate}</p>
//               </div>
//               <div className="icons">
//                 <button
//                   className={`like-button ${liked[index] ? 'liked' : ''}`}
//                   onClick={() => handleClick(index)}
//                 >
//                   <img src={LikeIcon} alt="like icon" className="like-icon" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ResolveQuery;

