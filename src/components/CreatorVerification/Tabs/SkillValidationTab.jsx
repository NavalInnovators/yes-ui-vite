import { Plus } from "lucide-react";

function UploadDocument() {
  return (
    <div className="mt-[20px] flex items-center gap-[10px]">
      <div className="bg-[#fff] p-[7px] cursor-pointer w-fit">
        <Plus size={18} />
      </div>

      <p className="text-[14px] font-light">Upload PDF, DOC File</p>
    </div>
  );
}

export default function SkillValidation() {
  return (
    <div className="w-[full] relative rounded-gradient-border bg-light-card p-[20px] max-w-[700px] rounded-lg mt-[5px] mx-auto">
      <h1 className="text-[22px] font-semibold text-center">
        Submit the Answers
      </h1>

      <div className="text-[14px] bg-[#fff] rounded-lg p-[20px] mt-[20px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni tenetur
        dolor, impedit quia debitis non nobis, facere explicabo soluta rem sequi
        ratione iste eum expedita aperiam.
      </div>

      <div className="bg-[#fff] h-[100px] rounded-lg p-[20px] mt-[10px]"></div>

      <UploadDocument />

      <div className="flex justify-center mt-[30px]">
        <button className="bg-black text-white px-[15px] py-[9px] rounded-lg text-[14px] cursor-pointer">
          Submit
        </button>
      </div>
    </div>
  );
}
