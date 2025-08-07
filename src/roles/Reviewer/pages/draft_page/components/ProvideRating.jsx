import { useState } from "react";
import StarRating from "../../../components/StarRating";

const factors = [
  "Relevance",
  "Accuracy",
  "Clarity and Structure",
  "Depth and Understanding",
  "Presentation and Language",
];

function RatingWithFactor({ factor, index, setRatings }) {
  return (
    <div className="flex items-center gap-[20px]">
      <StarRating maxRating={5} size={20} defaultRating={0} setOutsideRating={ (currentRating) => setRatings((prevRating => {
        const newRatings = [...prevRating];
        newRatings[index] = currentRating;
        return newRatings;
      }))} />
      <p className="text-[13px] font-light">{factor}</p>
    </div>
  );
}

export default function ProvideRating() {
  const [ratings, setRatings] = useState(Array(factors.length).fill(0));

  const averageRating = ratings.reduce((acc, currRating) => acc + currRating, 0) / factors.length;

  return (
    <div className="dark:bg-dark-card dark:text-white dark:border dark:border-dark-border bg-[#fff] px-[25px] py-[20px] rounded-[6px]">
      {/* Header */}
      <div className="flex items-center justify-between text-[18px]">
        <h1 className="text-sm font-semibold">Provide the Ratings</h1>
        <div className="text-lg flex items-center gap-[5px]">
          <StarRating maxRating={1} defaultRating={1} fixed={true} size={20} />
          {averageRating.toFixed(1)}
        </div>
      </div>

      {/* Star Rating Components */}
      <div className="flex flex-col gap-[8px] mt-[15px]">
        {factors.map((factor, i) => (
          <RatingWithFactor key={i} factor={factor} index={i} setRatings={setRatings} />
        ))}
      </div>
    </div>
  );
}
