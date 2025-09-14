import { CircleCheck, Stamp } from "lucide-react";
import GradientDiv from "../../roles/components/GradientDiv";
import { useState } from "react";
import DocumentVerificationTab from "./Tabs/DocumentVerificationTab";
import SkillValidationTab from "./Tabs/SkillValidationTab";
import Header from "./Header";
import ContentRelevanceTab from "./Tabs/ContentRelevanceTab";

function Tabs({ activeTab, handleTabClick }) {
  const activeBg = "bg-white rounded-gradient-border relative";

  return (
    <div className="w-full max-w-[700px] rounded-lg mt-[30px] mx-auto mb-[10px] px-[10px] md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 items-stretch gap-[8px] md:gap-[5px]">
        <div
          className={`cursor-pointer flex items-center justify-center gap-[8px] md:gap-[10px] rounded-lg text-[14px] md:text-[16px] py-[14px] md:py-[20px] ${
            activeTab === "content-relevance" ? activeBg : "bg-light-card"
          }`}
          onClick={() => handleTabClick("content-relevance")}
        >
          <CircleCheck />
          Content Relevance
        </div>
        <div
          className={`cursor-pointer flex items-center justify-center gap-[8px] md:gap-[10px] rounded-lg text-[14px] md:text-[16px] py-[14px] md:py-[20px] ${
            activeTab === "document-verification" ? activeBg : "bg-light-card"
          }`}
          onClick={() => handleTabClick("document-verification")}
        >
          <CircleCheck />
          Document Verification
        </div>
        <div
          className={`cursor-pointer flex items-center justify-center gap-[8px] md:gap-[10px] rounded-lg text-[14px] md:text-[16px] py-[14px] md:py-[20px] ${
            activeTab === "skill-validation" ? activeBg : "bg-light-card"
          }`}
          onClick={() => handleTabClick("skill-validation")}
        >
          <Stamp />
          Skill Validation
        </div>
      </div>
    </div>
  );
}

export default function CreatorVerification() {
  const [activeTab, setActiveTab] = useState("content-relevance");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [contentRelevance, setContentRelevance] = useState({
    areas_of_interest: {
      technology: false,
      finance: false,
      health: false,
      education: false,
    },
    has_written_articles: false,
    sample_work_link: null,
    reason_for_becoming_creator: "",
    comfortable_with_guidelines: false,
  });

  // Function to select the topic of interest
  function handleTopicClick(type) {
    setContentRelevance((prev) => ({
      ...prev,
      areas_of_interest: {
        ...prev.areas_of_interest,
        [type]: !prev.areas_of_interest[type],
      },
    }));
  }

  function handleWrittenArticlesClick() {
    setContentRelevance((prev) => ({
      ...prev,
      has_written_articles: !prev.has_written_articles,
    }));
  }

  function handleComfortableWithGuidelinesClick() {
    setContentRelevance((prev) => ({
      ...prev,
      comfortable_with_guidelines: !prev.comfortable_with_guidelines,
    }));
  }

  function handleSampleWorkLinkChange(e) {
    setContentRelevance((prev) => ({
      ...prev,
      sample_work_link: e.target.value,
    }));
  }

  function handleReasonForBecomingCreatorChange(e) {
    setContentRelevance((prev) => ({
      ...prev,
      reason_for_becoming_creator: e.target.value,
    }));
  }

  return (
    <div className="mb-[30px]">
      <Header />

      <GradientDiv className="px-[5vw] py-[12px] md:py-[16px]">
        <h1 className="text-[18px] md:text-[20px]">Become a Creator!</h1>
        <p className="text-[14px] md:text-[16px]">
          Step{" "}
          {activeTab === "content-relevance"
            ? 1
            : activeTab === "document-verification"
            ? 2
            : 3}
        </p>
      </GradientDiv>

      <Tabs activeTab={activeTab} handleTabClick={handleTabClick} />

      <div className="px-[10px]">
        {activeTab === "content-relevance" && (
          <ContentRelevanceTab
            contentRelevance={contentRelevance}
            handleTopicClick={handleTopicClick}
            handleWrittenArticlesClick={handleWrittenArticlesClick}
            handleComfortableWithGuidelinesClick={
              handleComfortableWithGuidelinesClick
            }
            handleSampleWorkLinkChange={handleSampleWorkLinkChange}
            handleReasonForBecomingCreatorChange={
              handleReasonForBecomingCreatorChange
            }
          />
        )}
      </div>

      <div className="px-[10px]">
        {activeTab === "document-verification" && <DocumentVerificationTab />}
      </div>

      <div className="px-[10px]">
        {activeTab === "skill-validation" && <SkillValidationTab />}
      </div>
    </div>
  );
}
