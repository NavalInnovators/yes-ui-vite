import { Plus, Loader2 } from "lucide-react";
import { BACKEND_URL } from "../../../constants/api";
import { useAuth } from "../../AuthProvider";
import { useState } from "react";

function TopicButton({
  topic,
  type,
  contentRelevance,
  handleTopicClick,
  includeIcon = true,
  isLoading = false,
}) {
  const selected = "bg-dark-hover text-white border-black";
  const unselected = "bg-[#fff] hover:bg-[hsl(0,0%,95%)] border-light-border";

  return (
    <div
      className={`${
        contentRelevance.areas_of_interest[type] ? selected : unselected
      } ${
        isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } px-[12px] md:px-[15px] py-[6px] md:py-[5px] rounded-full border text-[12px] md:text-[13px] flex items-center gap-[6px] justify-center whitespace-nowrap shrink-0`}
      onClick={() => !isLoading && handleTopicClick(type)}
    >
      {includeIcon && <Plus size={15} />}
      {topic}
    </div>
  );
}

function WrittenArticlesButton({
  hasWrittenArticles,
  handleWrittenArticlesClick,
  text,
  isLoading = false,
}) {
  const selected = "bg-dark-hover text-white border-black";
  const unselected = "bg-[#fff] hover:bg-[hsl(0,0%,95%)] border-light-border";

  return (
    <div
      className={`${
        (hasWrittenArticles && text === "Yes") ||
        (!hasWrittenArticles && text === "No")
          ? selected
          : unselected
      } ${
        isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } px-[15px] py-[5px] rounded-full border text-[13px] flex items-center gap-[5px] justify-center`}
      onClick={() => !isLoading && handleWrittenArticlesClick()}
    >
      {text}
    </div>
  );
}

export default function ContentRelevanceTab({
  contentRelevance,
  handleTopicClick,
  handleWrittenArticlesClick,
  handleComfortableWithGuidelinesClick,
  handleSampleWorkLinkChange,
  handleReasonForBecomingCreatorChange,
  onSuccess,
}) {
  const profileId = useAuth().getProfileId();
  const [isLoading, setIsLoading] = useState(false);
  let requestId;

  // TODO : Backend API call to get the creator verification data
  async function fetchBackend() {
    setIsLoading(true);
    const data = {
      coursesId: [3],
      hasWrittenArticles: contentRelevance.has_written_articles,
      sampleWorkLink: contentRelevance.sample_work_link,
      whyBecomeCreator: contentRelevance.reason_for_becoming_creator,
    };

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://your-exam-saathi-backend.onrender.com/api/creator-onboarding/content-relevance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            profileId: profileId,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const data = await response.json();
        requestId = data.requestId;
        console.log("Content Relevance Data: ", data);
        // Call the success callback to notify parent component
        if (onSuccess) {
          onSuccess(requestId);
        }
      }
    } catch (error) {
      console.error("Error fetching backend:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex rounded-gradient-border relative flex-col gap-[30px] w-full bg-light-card p-[20px] md:p-[30px] max-w-[700px] rounded-lg mt-[5px] mx-auto">
      {/* Topic areas of interest */}
      <div>
        <h1 className="text-[17px] font-semibold">Topic areas of interest</h1>
        <div className="flex flex-wrap items-center gap-[8px] md:gap-[10px] mt-[15px]">
          <TopicButton
            topic="Technology"
            type="technology"
            contentRelevance={contentRelevance}
            handleTopicClick={handleTopicClick}
            isLoading={isLoading}
          />
          <TopicButton
            topic="Finance"
            type="finance"
            contentRelevance={contentRelevance}
            handleTopicClick={handleTopicClick}
            isLoading={isLoading}
          />
          <TopicButton
            topic="Health"
            type="health"
            contentRelevance={contentRelevance}
            handleTopicClick={handleTopicClick}
            isLoading={isLoading}
          />
          <TopicButton
            topic="Education"
            type="education"
            contentRelevance={contentRelevance}
            handleTopicClick={handleTopicClick}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Have you written articles before */}
      <div>
        <h1 className="text-[17px] font-semibold">
          Have you written articles before
        </h1>

        <div className="flex items-center gap-[10px] mt-[15px]">
          <WrittenArticlesButton
            hasWrittenArticles={contentRelevance.has_written_articles}
            handleWrittenArticlesClick={handleWrittenArticlesClick}
            text="Yes"
            isLoading={isLoading}
          />
          <WrittenArticlesButton
            hasWrittenArticles={contentRelevance.has_written_articles}
            handleWrittenArticlesClick={handleWrittenArticlesClick}
            text="No"
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Sample work of writing link */}
      <div>
        <h1 className="text-[17px] font-semibold">
          Sample work of writing link{" "}
          <span className="text-[13px] text-gray-500 font-light">
            (optional)
          </span>
        </h1>

        <textarea
          className={`w-full mt-[15px] !text-[16px] outline-none p-[20px] ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          placeholder="Write here..."
          value={contentRelevance.sample_work_link || ""}
          onChange={(e) => {
            if (!isLoading) handleSampleWorkLinkChange(e);
          }}
          disabled={isLoading}
        ></textarea>
      </div>

      {/* Why do you want to become a creator on our platform? */}
      <div>
        <h1 className="text-[17px] font-semibold">
          Why do you want to become a creator on our platform?{" "}
          <span className="text-[13px] text-gray-500 font-light">
            (optional)
          </span>
        </h1>

        <textarea
          className={`w-full mt-[15px] !text-[16px] outline-none p-[20px] ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          placeholder="Write here..."
          value={contentRelevance.reason_for_becoming_creator || ""}
          onChange={(e) => {
            if (!isLoading) handleReasonForBecomingCreatorChange(e);
          }}
          disabled={isLoading}
        ></textarea>
      </div>

      <div className="flex items-center gap-[10px]">
        <input
          type="checkbox"
          id="check"
          className={`cursor-pointer ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onChange={handleComfortableWithGuidelinesClick}
          checked={contentRelevance.comfortable_with_guidelines}
          disabled={isLoading}
        />

        <label
          htmlFor="check"
          className="text-[17px] font-semibold cursor-pointer"
        >
          Are you comfortable with our content guidelines and policies?
        </label>
      </div>

      <div className="flex justify-center">
        <button
          onClick={fetchBackend}
          disabled={isLoading}
          className={`border-2 border-black transition px-[20px] py-[10px] rounded-lg flex items-center gap-[8px] justify-center ${
            isLoading
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-dark-hover hover:bg-white hover:text-black cursor-pointer text-white"
          }`}
        >
          {isLoading && <Loader2 size={16} className="animate-spin" />}
          {isLoading ? "Submitting..." : "Submit and Next"}
        </button>
      </div>
    </div>
  );
}
