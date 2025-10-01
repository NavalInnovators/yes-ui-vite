import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EditDetailsIcon, hat } from "../../assets";
import "./EducationSection.css";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getEduData, getAllUniversities, getAllColleges, getBranches } from "../../api/api";
import { LoadingState, ErrorState, DataUnavailableState } from "../LoadingStates";

const EducationSection = () => {
  const [eduData, setEduData] = useState({
    university: "",
    collegeName: "",
    branch: "",
    year: ""
  });

  // Get education data with IDs
  const { 
    data: eduDetails, 
    // isLoading: isLoadingEduDetails 
  } = useQuery({
    queryKey: ['educationData'],
    queryFn: getEduData,
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch Education Details");
    }
  });

  // Get universities to map ID to name
  const { data: universities } = useQuery({
    queryKey: ['universities'],
    queryFn: getAllUniversities,
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch Universities");
    }
  });

  // Get colleges based on university ID
  const { data: colleges } = useQuery({
    queryKey: ['colleges', eduDetails?.universityId],
    queryFn: () => getAllColleges(eduDetails?.universityId),
    enabled: !!eduDetails?.universityId,
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch Colleges");
    }
  });

  // Get branches based on college ID
  const { data: branches } = useQuery({
    queryKey: ['branches', eduDetails?.collegeId],
    queryFn: () => getBranches(eduDetails?.collegeId),
    enabled: !!eduDetails?.collegeId,
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch Branches");
    }
  });

  useEffect(() => {
    if (eduDetails && universities && colleges && branches) {
      const university = universities.find(u => u.universityId === eduDetails.universityId)?.universityName || "";
      const college = colleges.find(c => c.id === eduDetails.collegeId)?.name || "";
      const branch = branches.find(b => b.branchId === eduDetails.branchId)?.branchName || "";
      
      setEduData({
        university,
        collegeName: college,
        branch,
        year: eduDetails.year ? `${eduDetails.year}${getYearSuffix(eduDetails.year)}` : ""
      });
    }
  }, [eduDetails, universities, colleges, branches]);

  const getYearSuffix = (year) => {
    switch (year) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      case 4: return "th";
      default: return "";
    }
  };

  // Show loading state while education data is being fetched
  if (!eduDetails && !universities) {
    return (
      <section id="education" className="profile-sections">
        <div className="section-header">
          <div className="heading-500-30-black profile-section-heading">
            Education Details
          </div>
        </div>
        <div className="education-details">
          <LoadingState message="Loading your education details..." size="medium" />
        </div>
      </section>
    );
  }

  // Show error state if education data failed to load
  if (!eduDetails) {
    return (
      <section id="education" className="profile-sections">
        <div className="section-header">
          <div className="heading-500-30-black profile-section-heading">
            Education Details
          </div>
        </div>
        <div className="education-details">
          <ErrorState message="Failed to load your education details. Please try again." size="medium" />
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="profile-sections">
      <div className="section-header">
        <div className="heading-500-30-black profile-section-heading">
          Education Details
        </div>
        <Link to="/edit-education">
          <img src={EditDetailsIcon} alt="editIcon" />
        </Link>
      </div>
      <div className="education-details font-paragraph-black-light">
        <div className="profile-sec-full-cell education-sec-first-full-cell">
          <img src={hat} alt="Hat Icon" />
          <span>University:</span> {eduData.university}
        </div>
        <div className="profile-sec-full-cell">
          <img src={hat} alt="Hat Icon" />
          <span>College Name:</span> {eduData.collegeName}
        </div>
        <div className="profile-sec-full-cell">
          <img src={hat} alt="Hat Icon" />
          <span>Branch:</span> {eduData.branch}
        </div>
        <div className="profile-sec-full-cell profile-sec-phone-full-cell">
          <img src={hat} alt="Hat Icon" />
          <span>Year:</span> {eduData.year}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;