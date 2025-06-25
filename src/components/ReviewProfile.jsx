import "./ReviewProfile.css";
import React, { useState } from 'react';
import { BackArrow, AttachmentIcon } from "../assets";
import { useNavigate } from 'react-router-dom';

const ReviewProfile = () => {
    const navigate = useNavigate();

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [video, setVideo] = useState(null);

    const handleRatingClick = (star) => {
        setRating(star);
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size < 10 * 1024 * 1024) { // Check if file size is under 10MB
            setVideo(file);
        } else {
            alert('File size should be under 10MB');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        navigate('/user-dashboard');
    };


    return (

        <div className="review-profile-container">
            <div className="gradient-strip">

                <div className="gradient-strip-heading-left">
                    <div className="back-arrow">
                        <img onClick={() => navigate(-1)} src={BackArrow} alt="BackArrow" />
                    </div>
                    Review
                </div>
            </div>

            <div className="review-form-container">
                <div className="review-form-title heading-500-30-black">Write a review!</div>
                <div className="review-form-description font-paragraph-black-light">
                    <div className="review-form-description-container">
                        Your feedback is essential for our improvement, please share any thoughts or suggestions you have.
                    </div>
                </div>

                {/* Star rating system */}
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`star ${rating >= star ? `star-${star}` : ''}`}
                            onClick={() => handleRatingClick(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>

                {/* Text area for review */}
                <textarea
                    className="review-textarea"
                    placeholder="How well do you like it ?..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                ></textarea>

                {/* Video upload section */}
                <div className="video-upload">
                    <label htmlFor="video-upload-input" className="video-upload-label">
                        <img src={AttachmentIcon} alt="attachment" className="video-upload-icon" />
                    </label>
                    <input
                        id="video-upload-input"
                        type="file"
                        accept="video/mp4"
                        className="video-upload-input"
                        onChange={handleVideoChange}
                    />
                    <div className="video-upload-texts">
                        <div className="font-subheading-black">
                        Upload a Video
                        </div>
                        <div className="font-paragraph-grey">File format should be as MP4 and under 10 MB</div>
                    </div>
                </div>

                {/* Submit button */}
                <button  className="submit-button font-public-sans-navbar" onClick={handleSubmit}>
                    Submit
                </button>
            </div>

        </div>
    );
}

export default ReviewProfile;