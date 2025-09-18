import { useState, useEffect, useRef } from "react";
import { Loader2, Plus, File, X } from "lucide-react";
import { useAuth } from "../../AuthProvider";
import Student from "../icons/Student";
import Professional from "../icons/Professional";
import Others from "../icons/Others";

function UploadDocument({ text }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    // Reset the file input using ref
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-[#fff] rounded-lg p-[20px] mt-[20px]">
      <div>
        <div>
          <h1 className="text-[17px] font-semibold">{text}</h1>
          <p className="text-[14px] text-gray-500 font-light">
            File format should be PDF, DOC, or DOCX
          </p>
        </div>

        <div className="mt-[10px]">
          <input
            ref={fileInputRef}
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />

          {selectedFile ? (
            // Show selected file
            <div className="w-full h-[120px] border-2 border-green-300 bg-green-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <File size={32} className="text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-green-600">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="p-1 hover:bg-green-200 rounded-full transition-colors"
              >
                <X size={20} className="text-green-600" />
              </button>
            </div>
          ) : (
            // Show upload area
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-[120px] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              <Plus size={40} className="text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Click to upload</p>
              <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX files</p>
            </label>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-[30px]">
        <button className="px-[20px] py-[10px] text-[14px] cursor-pointer bg-black text-white rounded-lg">
          Submit and Next
        </button>
      </div>
    </div>
  );
}

export default function DocumentVerification({ requestId }) {
  const [creatorType, setCreatorType] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const profileId = useAuth().getProfileId();

  const activeBg = "border-2 border-black-500";

  // API call when creatorType changes
  useEffect(() => {
    if (requestId && creatorType) {
      updateCreatorCategory();
    }
  }, [creatorType, requestId]);

  async function updateCreatorCategory() {
    if (!requestId) return;

    setIsLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://your-exam-saathi-backend.onrender.com/api/creator-onboarding/document-verification/${requestId}/category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            profileId: profileId,
          },
          body: JSON.stringify({ userCategory: creatorType.toUpperCase() }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Document Verification Category Updated: ", data);
      }
    } catch (error) {
      console.error("Error updating creator category:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function uploadDocument() {
    if (!requestId) return;
  }

  return (
    <div className="w-full relative rounded-gradient-border bg-light-card p-[20px] max-w-[700px] rounded-lg mt-[5px] mx-auto">
      <h1 className="text-[22px] text-center font-semibold mb-[20px]">
        Are you a?
      </h1>

      <div className="flex items-center justify-between gap-[20px]">
        <div
          className={`bg-[#fff] py-[20px] relative rounded-lg flex-1 flex flex-col items-center gap-[10px] ${
            creatorType === "student" ? activeBg : ""
          } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() => !isLoading && setCreatorType("student")}
        >
          {isLoading && creatorType === "student" && (
            <Loader2
              size={20}
              className="animate-spin absolute top-2 right-2"
            />
          )}
          <Student />
          <p>Student</p>
        </div>

        <div
          className={`bg-[#fff] py-[20px] rounded-lg flex-1 flex flex-col items-center gap-[10px] ${
            creatorType === "professional" ? activeBg : ""
          } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() => !isLoading && setCreatorType("professional")}
        >
          {isLoading && creatorType === "professional" && (
            <Loader2
              size={20}
              className="animate-spin absolute top-2 right-2"
            />
          )}
          <Professional />
          <p>Professional</p>
        </div>

        <div
          className={`bg-[#fff] py-[20px] rounded-lg flex-1 flex flex-col items-center gap-[10px] ${
            creatorType === "others" ? activeBg : ""
          } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() => !isLoading && setCreatorType("others")}
        >
          {isLoading && creatorType === "others" && (
            <Loader2
              size={20}
              className="animate-spin absolute top-2 right-2"
            />
          )}
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
