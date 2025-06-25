import "./Courses.css";
import { coursesCards } from "../constants";
import { relevantTags } from "../constants";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
const Courses = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    return (
        <div className="courses">
            <div className="courses-title font-heading-black">
                Have any doubt? Find the solution!
            </div>

            <div className="courses-sections">
                <div className="courses-cards">
                    {coursesCards.map((course) => (
                        <div className="each-course" onClick={isLoggedIn ? ()=>navigate('/book-dashboard') : ()=>navigate('/login')} >
                            <div className="course-text">
                                <div className="sub-name font-subheading-black">
                                    {course.subName}
                                </div>
                                {/* <div className="font-paragraph-grey course-desc">
                                    Description: {course.subDesc}
                                </div> */}
                                <div className="tags-section">
                                    <hr />
                                    <div className="course-tags">

                                        <div className="tag-shape">
                                            Univ: {course.univ}
                                        </div>
                                        <div className="tag-shape">
                                            {course.year}
                                        </div>
                                        <div className="tag-shape">
                                            {course.branch}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="course-img">
                                <img src={course.img} alt="img-course" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="courses-side-sections">

                    <div className="side-section-title font-subheading-black">Discover more categories of what are you looking for: </div>
                    <div className="relevant-tags">


                        {relevantTags.map((tag) => (
                            <div className="each-tag tag-shape-grey">
                                {tag.value}
                            </div>
                        ))}

                    </div>
                    <div className="search-more-btn">
                        {/* TODO: change the url to all-subjects */}
                        <button onClick={()=>navigate('/user-dashboard') } className="colourful-border-btn font-colourful-border-btn">Search More Topics</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Courses;