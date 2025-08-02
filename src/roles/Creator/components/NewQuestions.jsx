import Line from "../../components/Line";
import SelectTopic from "../../components/SelectTopic";
import { useState } from "react";

export default function NewQuestions() {
  const options = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6",
  ];

  const [selectedOption, setSelectedOption] = useState("Select an Option");

  function filterByTopicName() {}

  return (
    <div className="w-[60%] flex flex-col gap-[20px] rounded-[8px] p-[30px] border-[1px] border-light-border">
      <h1 className="text-[20px]">New Questions</h1>

      <Line />

      <SelectTopic
        options={options}
        filterByTopicName={filterByTopicName}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <Line />
    </div>
  );
}
