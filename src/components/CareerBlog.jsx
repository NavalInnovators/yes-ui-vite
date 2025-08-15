import { useState, useMemo, useEffect } from "react";
import "./CareerBlog.css";
import { useNavigate } from "react-router-dom";
import { jobData, jobCategories } from "../constants";
import CTA from "./CTA";

const CareerBlog = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Check if the view is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleViewJob = (job) => {
    navigate("/careerJob-page", { state: { job } });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredJobs = useMemo(() => {
    return jobData.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        job.description.toLowerCase().includes(searchInput.toLowerCase()) ||
        job.role_and_responsibilities.some((resp) =>
          resp.toLowerCase().includes(searchInput.toLowerCase())
        ) ||
        job.qualifications_and_experience.some((qual) =>
          qual.toLowerCase().includes(searchInput.toLowerCase())
        );

      const matchesCategory =
        !selectedCategory || job.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchInput, selectedCategory]);

  return (
    <div className="career-blog">
      {/* Header Section */}
      <div className="header">
        <div className="header-heading">Career</div>
        <div className="header-para">
          Welcome to the Career page, your gateway to exciting opportunities
          that align with your aspirations. Explore diverse roles, apply your
          skills, and embark on a journey toward professional growth and
          success.
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="career-search-bar">
        <input
          type="text"
          placeholder="Search jobs by title or keyword"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="input-box"
        />

        {/* Custom CSS Dropdown replacing select element */}
        <div className="custom-dropdown">
          <div className="dropdown-button">
            {isMobile && !selectedCategory ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z" />
              </svg>
            ) : (
              <span>{selectedCategory || "All Categories"}</span>
            )}
            <svg
              className="dropdown-arrow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div className="dropdown-content">
            <div
              className="dropdown-item"
              onClick={() => handleCategorySelect("")}
            >
              All Categories
            </div>
            {jobCategories.map((category) => (
              <div
                key={category}
                className="dropdown-item"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job Card Section */}
      <div className="job-card-section">
        {filteredJobs.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          filteredJobs.map((job, index) => (
            <div key={index} className="job-card">
              <div className="main-container">
                <div className="career-title font-subheading-black">
                  {job.title}
                </div>
                <div className="career-description font-paragraph">
                  {job.description}
                </div>
              </div>
              <div className="card-buttons">
                <button
                  className="apply-btn"
                  onClick={() =>
                    window.open(job.link, "_blank", "noopener,noreferrer")
                  }
                >
                  Apply
                </button>
                <button className="view-btn" onClick={() => handleViewJob(job)}>
                  View Job
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Creator Verification Section */}
      <div className="my-20 mx-auto">
        <div className="max-w-[942px] mx-auto py-16 border-t border-light-border">
          <h1 className="text-5xl text-center">Become a Creator and Earn</h1>

          <p className="mt-[30px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, et
            sunt modi, incidunt cum recusandae velit tenetur enim reiciendis
            atque officia obcaecati vero dolor fugiat harum eligendi blanditiis
            veniam magnam ratione nam. Ducimus, delectus! Accusamus ab
            blanditiis suscipit voluptates aperiam, temporibus excepturi
            molestiae dolores culpa labore quidem. Quisquam perspiciatis
            corporis earum consectetur laborum! Odit sint omnis tempore.
            Tenetur, rerum magnam.
          </p>
        </div>

        {/* Verification Process Div */}
        <div className="">
          <div className="header"></div>
        </div>
      </div>

      <CTA />
    </div>
  );
};

export default CareerBlog;
