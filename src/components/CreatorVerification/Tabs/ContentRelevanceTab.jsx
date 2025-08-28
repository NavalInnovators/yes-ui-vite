import { Plus } from "lucide-react";

function TopicButton({
  topic,
  type,
  contentRelevance,
  handleTopicClick,
  includeIcon = true,
}) {
  const selected = "bg-dark-hover text-white border-black";
  const unselected = "bg-[#fff] hover:bg-[hsl(0,0%,95%)] border-light-border";

  return (
    <div
      className={`${
        contentRelevance.areas_of_interest[type] ? selected : unselected
      } cursor-pointer px-[15px] py-[5px] rounded-full border text-[13px] flex items-center gap-[5px] justify-center`}
      onClick={() => handleTopicClick(type)}
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
}) {
  const selected = "bg-dark-hover text-white border-black";
  const unselected = "bg-[#fff] hover:bg-[hsl(0,0%,95%)] border-light-border";

  return (
    <div
      className={`${
        hasWrittenArticles && text === "Yes"
          ? selected
          : !hasWrittenArticles && text === "No"
          ? selected
          : unselected
      } cursor-pointer px-[15px] py-[5px] rounded-full border text-[13px] flex items-center gap-[5px] justify-center`}
      onClick={() => handleWrittenArticlesClick()}
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
}) {
  return (
    <div className="flex flex-col gap-[30px] w-[full] bg-light-card p-[30px] max-w-[700px] rounded-lg mt-[5px] mx-auto">
      {/* Topic areas of interest */}
      <div>
        <h1 className="text-[17px] font-semibold">Topic areas of interest</h1>
        <div className="flex items-center gap-[10px] mt-[15px]">
          <TopicButton
            topic="Technology"
            type="technology"
            contentRelevance={contentRelevance}
            handleTopicClick={handleTopicClick}
          />
          <TopicButton
            topic="Finance"
            type="finance"
            contentRelevance={contentRelevance}
            handleTopicClick={handleTopicClick}
          />
          <TopicButton
            topic="Health"
            type="health"
            contentRelevance={contentRelevance}
            handleTopicClick={handleTopicClick}
          />
          <TopicButton
            topic="Education"
            type="education"
            contentRelevance={contentRelevance}
            handleTopicClick={handleTopicClick}
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
            hasWrittenArticles={contentRelevance.written_articles_before}
            handleWrittenArticlesClick={handleWrittenArticlesClick}
            text="Yes"
          />
          <WrittenArticlesButton
            hasWrittenArticles={contentRelevance.written_articles_before}
            handleWrittenArticlesClick={handleWrittenArticlesClick}
            text="No"
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
          className="w-full mt-[15px] !text-[16px] outline-none p-[20px]"
          placeholder="Write here..."
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
          className="w-full mt-[15px] !text-[16px] outline-none p-[20px]"
          placeholder="Write here..."
        ></textarea>
      </div>

      <div className="flex items-center gap-[10px]">
        <input
          type="checkbox"
          id="check"
          className="cursor-pointer"
          onChange={handleComfortableWithGuidelinesClick}
          checked={contentRelevance.comfortable_with_guidelines}
        />

        <label
          htmlFor="check"
          className="text-[17px] font-semibold cursor-pointer"
        >
          Are you comfortable with our content guidelines and policies?
        </label>
      </div>

      <div className="flex justify-center">
        <button className="bg-dark-hover border-2 border-black hover:bg-white hover:text-black transition cursor-pointer text-white px-[20px] py-[10px] rounded-lg">
          Submit and Next
        </button>
      </div>
    </div>
  );
}
