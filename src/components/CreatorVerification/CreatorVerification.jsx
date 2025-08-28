import { CircleCheck, Plus, Stamp } from "lucide-react";
import GradientDiv from "../../roles/components/GradientDiv";
import { useState } from "react";
import DocumentVerificationTab from "./Tabs/DocumentVerificationTab";
import SkillValidationTab from "./Tabs/SkillValidationTab";
import Header from "./Header";
import ContentRelevanceTab from "./Tabs/ContentRelevanceTab";

function Tabs({ activeTab, handleTabClick }) {
  const activeBg = "bg-dark-hover text-white";

  return (
    <div className="w-[full] max-w-[700px] rounded-lg mt-[30px] mx-auto">
      <div className="flex justify-between items-center gap-[5px]">
        <div
          className={`cursor-pointer flex items-center justify-center gap-[10px] flex-1 rounded-lg text-[16px] py-[20px] ${
            activeTab === "content-relevance" ? activeBg : "bg-light-card"
          }`}
          onClick={() => handleTabClick("content-relevance")}
        >
          <CircleCheck />
          Content Relevance
        </div>
        <div
          className={`cursor-pointer flex items-center justify-center gap-[10px] flex-1 rounded-lg text-[16px] py-[20px] ${
            activeTab === "document-verification" ? activeBg : "bg-light-card"
          }`}
          onClick={() => handleTabClick("document-verification")}
        >
          <CircleCheck />
          Document Verification
        </div>
        <div
          className={`cursor-pointer flex items-center justify-center gap-[10px] flex-1 rounded-lg text-[16px] py-[20px] ${
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
    written_articles_before: false,
    writing_sample: null,
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
      written_articles_before: !prev.written_articles_before,
    }));
  }

  function handleComfortableWithGuidelinesClick() {
    setContentRelevance((prev) => ({
      ...prev,
      comfortable_with_guidelines: !prev.comfortable_with_guidelines,
    }));
  }

  return (
    <div className="mb-[30px]">
      <Header />

      <GradientDiv className="px-[5vw]">
        <h1 className="text-[20px]">Become a Creator!</h1>
        <p>
          Step{" "}
          {activeTab === "content-relevance"
            ? 1
            : activeTab === "document-verification"
            ? 2
            : 3}
        </p>
      </GradientDiv>

      <Tabs activeTab={activeTab} handleTabClick={handleTabClick} />

      {activeTab === "content-relevance" && (
        <ContentRelevanceTab
          contentRelevance={contentRelevance}
          handleTopicClick={handleTopicClick}
          handleWrittenArticlesClick={handleWrittenArticlesClick}
          handleComfortableWithGuidelinesClick={
            handleComfortableWithGuidelinesClick
          }
        />
      )}

      {activeTab === "document-verification" && <DocumentVerificationTab />}
      {activeTab === "skill-validation" && <SkillValidationTab />}
    </div>
  );
}
