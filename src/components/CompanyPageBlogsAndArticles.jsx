import React from "react";
import "./CompanyPageBlogsAndArticles.css";
import { ChemistryWide } from "../assets";
import { useNavigate } from "react-router-dom";

function CompanyPageBlogsAndArticles() {
  const navigate = useNavigate();
  return (
    <div className="blogs-articles">
      <div className="blogs-articles-heading font-heading-black">
        Blogs & Articles
      </div>
      <div className="blogs-articles-card-container">
        <div className="blogs-articles-card">
          <img src={ChemistryWide} alt="" />
          <div className="blogs-articles-card-bottom">
            <div className="font-subheading-black">
              Lorem ipsum dolor sit amet, consectetuer se
            </div>
            <div className="font-paragraph-grey  ">
              Lorem ipsum dolor sit amet, consectetuer sed diam nonummy nibh
              euismod lorem ipsum dolor sit amecorem ipsum dolor sit amet,
              consectetuer sed diam nonummy nibh euismod lorem ipsum
            </div>
            <hr />
            <div className="card-date">16.Aug.2024</div>
          </div>
        </div>
        <div onClick={() => navigate("/page-not-found")} className="blogs-articles-card">
          <img src={ChemistryWide} alt="" />
          <div className="blogs-articles-card-bottom">
            <div className="font-subheading-black">
              Lorem ipsum dolor sit amet, consectetuer se
            </div>
            <div className="font-paragraph-grey  ">
              Lorem ipsum dolor sit amet, consectetuer sed diam nonummy nibh
              euismod lorem ipsum dolor sit amecorem ipsum dolor sit amet,
              consectetuer sed diam nonummy nibh euismod lorem ipsum
            </div>
            <hr />
            <div className="card-date">16.Aug.2024</div>
          </div>
        </div>
        <div onClick={() => navigate("/page-not-found")} className="blogs-articles-card">
          <img src={ChemistryWide} alt="" />
          <div className="blogs-articles-card-bottom">
            <div className="font-subheading-black">
              Lorem ipsum dolor sit amet, consectetuer se
            </div>
            <div className="font-paragraph-grey  ">
              Lorem ipsum dolor sit amet, consectetuer sed diam nonummy nibh
              euismod lorem ipsum dolor sit amecorem ipsum dolor sit amet,
              consectetuer sed diam nonummy nibh euismod lorem ipsum
            </div>
            <hr />
            <div className="card-date">16.Aug.2024</div>
          </div>
        </div>
        <div onClick={() => navigate("/page-not-found")} className="blogs-articles-card">
          <img src={ChemistryWide} alt="" />
          <div className="blogs-articles-card-bottom">
            <div className="font-subheading-black">
              Lorem ipsum dolor sit amet, consectetuer se
            </div>
            <div className="font-paragraph-grey  ">
              Lorem ipsum dolor sit amet, consectetuer sed diam nonummy nibh
              euismod lorem ipsum dolor sit amecorem ipsum dolor sit amet,
              consectetuer sed diam nonummy nibh euismod lorem ipsum
            </div>
            <hr />
            <div className="card-date">16.Aug.2024</div>
          </div>
        </div>
      </div>
      <button onClick={() => navigate("/page-not-found")} className="colourful-border-btn">View More</button>
    </div>
  );
}

export default CompanyPageBlogsAndArticles;
