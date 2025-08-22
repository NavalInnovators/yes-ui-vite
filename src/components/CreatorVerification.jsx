import { NavLink } from "react-router-dom";
import YESIcon from "../roles/components/icons/YESIcon";
import StandaloneDarkModeIcon from "../roles/components/icons/StandaloneDarkModeIcon";
import NotificationsIcon from "../roles/components/icons/NotificationsIcon";
import ProfileImage from "../roles/components/ProfileImage";
import { CircleCheck, Search, Stamp } from "lucide-react";
import GradientDiv from "../roles/components/GradientDiv";
import { useState } from "react";

function Header() {
  return (
    <header className="flex justify-between items-center text-[13px] px-[20px] py-[10px]">
      <div>
        <YESIcon size={60} />
      </div>

      <div className="flex items-center gap-[10px]">
        <div className="flex items-center gap-[10px] text-gray-500 mr-[20px]">
          <NavLink>Home</NavLink>
          <NavLink>Company</NavLink>
          <NavLink>Membership</NavLink>
          <NavLink>Services</NavLink>
          <NavLink>Career</NavLink>
          <NavLink>FAQ</NavLink>
          <NavLink>Contact</NavLink>
        </div>

        <div className="flex items-center gap-[15px]">
          <Search size={17} className="dark:text-white" />
          <StandaloneDarkModeIcon size={30} />
          <NotificationsIcon size={30} className="relative right-[10px]" />
        </div>

        <ProfileImage size={33} />
      </div>
    </header>
  );
}

function Tabs({ activeTab, handleTabClick }) {
  const activeBg = "bg-dark-hover text-white";

  return (
    <div className="w-[full] max-w-[700px] rounded-lg mt-[30px] mx-auto">
      <div className="flex justify-between items-center gap-[5px]">
        <div className={`cursor-pointer flex items-center justify-center gap-[10px] text-[13px] flex-1 rounded-lg text-[16px] py-[20px] ${activeTab === "content-relevance" ? activeBg : "bg-light-card"}`}
          onClick={() => handleTabClick("content-relevance")}>
          <CircleCheck />
          Content Relevance
        </div>
        <div className={`cursor-pointer flex items-center justify-center gap-[10px] text-[13px] flex-1 rounded-lg text-[16px] py-[20px] ${activeTab === "document-verification" ? activeBg : "bg-light-card"}`}
          onClick={() => handleTabClick("document-verification")}>
          <CircleCheck />
          Document Verification
        </div>
          <div className={`cursor-pointer flex items-center justify-center gap-[10px] text-[13px] flex-1 rounded-lg text-[16px] py-[20px] ${activeTab === "skill-validation" ? activeBg : "bg-light-card"}`}
          onClick={() => handleTabClick("skill-validation")}>
          <Stamp />
          Skill Validation
        </div>
      </div>
    </div>
  );
}

function ContentRelevance() {
  return <div className="w-[full] bg-light-card p-[20px] max-w-[700px] rounded-lg mt-[5px] mx-auto">Content Relevance</div>;
}

function DocumentVerification() {
  return <div className="w-[full] bg-light-card p-[20px] max-w-[700px] rounded-lg mt-[5px] mx-auto">Document Verification</div>;
}

function SkillValidation() {
  return <div className="w-[full] bg-light-card p-[20px] max-w-[700px] rounded-lg mt-[5px] mx-auto">Skill Validation</div>;
}

export default function CreatorVerification() {
  const [activeTab, setActiveTab] = useState("content-relevance");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // const [contentRelevance, setContentRelevance] = useState({
  //   areas_of_interest: [],
  //   written_articles_before: false,
  //   writing_sample: null,
  //   reason_for_becoming_creator: "",
  //   comfortable_with_guidelines: false,
  // });

  return (
    <div>
      <Header />

      <GradientDiv className="px-[5vw]">
        <h1 className="text-[20px]">Become a Creator!</h1>
        <p>Step {activeTab === "content-relevance" ? 1 : activeTab === "document-verification" ? 2 : 3}</p>
      </GradientDiv>

      <Tabs activeTab={activeTab} handleTabClick={handleTabClick} />

      {activeTab === "content-relevance" && <ContentRelevance />}
      {activeTab === "document-verification" && <DocumentVerification />}
      {activeTab === "skill-validation" && <SkillValidation />}
    </div>
  );
}
