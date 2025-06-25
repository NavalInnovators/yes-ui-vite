import React from "react";
import "./MembershipPage.css";
import MembershipPageHeader from "./MembershipPageHeader";
import MembershipPageAboutSec from "./MembershipPageAboutSec";
import MembershipPageAccordion from "./MembershipPageAccordion";
import CTA from "./CTA";

function MembershipPage() {
  return (
    <div className="membership-page-parent">
      <MembershipPageHeader />
      <MembershipPageAboutSec />
      <MembershipPageAccordion />
      <CTA/>
    </div>
  );
}

export default MembershipPage;
