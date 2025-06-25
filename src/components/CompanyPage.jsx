import React from "react";
import "./CompanyPage.css";
import CompanyPageHeader from "./CompanyPageHeader";
import CompanyPageDoubtSection from "./CompanyPageDoubtSection";
import CompanyPageProductSection from "./CompanyPageProductSection";
import CompanyPageHeaderWithCard from "./CompanyPageHeaderWithCard";
// import CompanyPageFreeStuff from "./CompanyPageFreeStuff";
// import CompanyPageBlogsAndArticles from "./CompanyPageBlogsAndArticles";
import CTA from "./CTA";
import Testimonials from "./Testimonials";
function CompanyPage() {
  return (
    <>
      <div className="parent-container">
        {/* <div className="doubt-sec">
          <div className="left-doubt-sec">
            <div className="doubt-sec-left-heading">
              For every student, Every classroom. Every Doubt.
            </div>
            <div className="doubt-sec-left-content">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore.
            </div>
          </div>
          <div className="right-doubt-sec">
            <div className="doubt-sec-right-div">
            <div className="doubt-sec-right-content">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero eros et accumsan et iusto odio
              dignissim qui blandit praesent luptatum zzril delenit augue duis.
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit.
            </div>
            <div className="back-img">
              <img src={y} alt="" />
              <img src={e} alt="" />
              <img src={s} alt="" />
            </div>
          </div></div>
        </div> */}

        <CompanyPageHeader />
        <CompanyPageDoubtSection />
        <CompanyPageProductSection />
        <CompanyPageHeaderWithCard />
        {/* <CompanyPageFreeStuff /> */}
        {/* <CompanyPageBlogsAndArticles /> */}
        <Testimonials />
        <CTA />
      </div>
    </>
  );
}

export default CompanyPage;
