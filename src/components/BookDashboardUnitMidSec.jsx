import React, { useEffect } from "react";
import BookDashboardNavbar from "./BookDashboardNavbar";
import "./BookDashboardUnitMidSec.css";
import { useBookDashboard } from "../context/book-dashboard-context";
import { useCart } from "../context/CartContext";
import parse from "html-react-parser";

function BookDashboardUnitMidSec({ currentSection, handleSectionChange }) {
  const { selectedUnit, notesList, unitNotesLoading, unitNotesError, subCode, selectedTopic, notesTopics, setSelectedTopic } = useBookDashboard();
  const { checkFeatureAccess } = useCart();
  // if (unitNotesLoading) {
  //   return <div>Loading unit notes...</div>;
  // }
  // if (unitNotesError) {
  //   return (
  //     <div>
  //       Error loading unit notes: Please log in or check if the subject code in URL is valid. {unitNotesError.message}
  //     </div>
  //   );
  // }
  
  // Get current course for access control
  const getCurrentCourse = () => {
    const allCourses = JSON.parse(sessionStorage.getItem('allCourses') || '[]');
    return allCourses.find(course => course.courseCodes.includes(subCode));
  };
  
  // Check access before displaying content
  const currentCourse = getCurrentCourse();
  const unitNumber = parseInt(selectedUnit);
  const hasAccess = currentCourse ? checkFeatureAccess(currentCourse.id, 'Notes', unitNumber) : false;
  
  // Handle topic filtering from roadmap navigation
  useEffect(() => {
    const filterByTopic = sessionStorage.getItem('filterByTopic');
    if (filterByTopic && notesTopics[selectedUnit]) {
      const currentUnitTopics = notesTopics[selectedUnit];
      const topicIndex = currentUnitTopics.findIndex(topic => topic.name === filterByTopic);
      if (topicIndex !== -1) {
        setSelectedTopic(topicIndex);
        // Clear the filter after applying
        sessionStorage.removeItem('filterByTopic');
      }
    }
  }, [selectedUnit, notesTopics, setSelectedTopic]);

  // Get current unit topics and selected topic content
  const currentUnitTopics = notesTopics[selectedUnit] || [];
  const selectedTopicContent = currentUnitTopics[selectedTopic];
  const unitNotesContent = selectedTopicContent?.content;
  return (
    <div className="parent-book-dashboard-unit">
      <BookDashboardNavbar currentSection={currentSection} handleSectionChange={handleSectionChange} />

      <div className="dropdown-cont">
        {/* to be commented out until filtering logic applied */}
        {/* <select name="" className="book-dashboard-dropdown common-css-dropdown">
          <option value="none">None</option>
          <option value="option1">Most Repeated</option>
          <option value="option2">Least Repeated</option>
          <option value="option1">Most Repeated</option>
          <option value="option2">Least Repeated</option>
          <option value="option1">Most Repeated</option>
          <option value="option2">Least Repeated</option>
          <option value="option1">Most Repeated</option>
          <option value="option2">Least Repeated</option>
        </select> */}
      </div>
      {hasAccess === false ? (
        <div className="access-denied-message" style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          backgroundColor: '#f8f9fa', 
          border: '1px solid #dee2e6', 
          borderRadius: '8px',
          margin: '1rem 0'
        }}>
          <h3 style={{ color: '#6c757d', marginBottom: '1rem' }}>🔒 Premium Content</h3>
          <p style={{ color: '#6c757d' }}>
            You need a Basic or Pro plan to access Unit {selectedUnit} notes. 
            Free users can only access Unit 1 notes.
          </p>
        </div>
      ) : unitNotesLoading
        ? (<div>Loading unit notes...</div>)
        : unitNotesError
          ? (<div>Error loading unit notes. Please contact support team or raise a query!</div>)
          : unitNotesContent
            ? (<div className="book-dashboard-question-summary-container">
              <div className="book-dashboard-question">
                {selectedTopicContent?.name || "Chapter Topic: Summary"}
              </div>
              {/* </div> */}
              <div className="book-dashboard-answer">
                {parse(unitNotesContent)}
              </div>
            </div>)
            : (<div>Data will be available soon!</div>)}
    </div>
  );
}

export default BookDashboardUnitMidSec;
