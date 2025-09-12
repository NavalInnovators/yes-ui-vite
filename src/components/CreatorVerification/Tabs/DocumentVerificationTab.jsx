import { useState } from "react";
import Student from "../icons/Student";
import Professional from "../icons/Professional";
import Others from "../icons/Others";

function UploadDocument({ text }) {
  return (
    <div className="bg-[#fff] rounded-lg p-[20px] mt-[20px]">
      <div>
        <h1 className="text-[17px] font-semibold">{text}</h1>
        <p className="text-[14px] text-gray-500 font-light">
          File format should be as JPG, PNG under 100kb
        </p>
      </div>

      <div className="flex justify-center mt-[30px]">
        <button className="px-[20px] py-[10px] text-[14px] cursor-pointer bg-black text-white rounded-lg">
          Submit and Next
        </button>
      </div>
    </div>
  );
}

export default function DocumentVerification() {
  const [creatorType, setCreatorType] = useState("student");

  const activeBg = "border-2 border-black-500";

  return (
    <div className="w-full relative rounded-gradient-border bg-light-card p-[20px] max-w-[700px] rounded-lg mt-[5px] mx-auto">
      <h1 className="text-[22px] text-center font-semibold mb-[20px]">
        Are you a?
      </h1>

      <div className="flex items-center justify-between gap-[20px]">
        <div
          className={`bg-[#fff] py-[20px] cursor-pointer relative rounded-lg flex-1 flex flex-col items-center gap-[10px] ${
            creatorType === "student" ? activeBg : ""
          }`}
          onClick={() => setCreatorType("student")}
        >
          <Student />
          <p>Student</p>
        </div>

        <div
          className={`bg-[#fff] py-[20px] cursor-pointer rounded-lg flex-1 flex flex-col items-center gap-[10px] ${
            creatorType === "professional" ? activeBg : ""
          }`}
          onClick={() => setCreatorType("professional")}
        >
          <Professional />
          <p>Professional</p>
        </div>

        <div
          className={`bg-[#fff] py-[20px] cursor-pointer rounded-lg flex-1 flex flex-col items-center gap-[10px] ${
            creatorType === "others" ? activeBg : ""
          }`}
          onClick={() => setCreatorType("others")}
        >
          <Others />
          <p>Others</p>
        </div>
      </div>

      <UploadDocument
        text={
          creatorType === "student"
            ? "Upload Your Most Recent Qualification Marksheet"
            : creatorType === "professional"
            ? "Upload Your LOR 'Letter of Recommendation'"
            : "Upload Any Of Your Government ID"
        }
      />
    </div>
  );
}
