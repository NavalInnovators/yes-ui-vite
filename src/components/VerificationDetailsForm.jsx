import React, { useState, useRef } from "react";
import "./VerificationDetailsForm.css";
import {
  college as collegeIcon,
  female,
  nonBinary,
  male,
  calenderIcon,
} from "../assets";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getAllUniversities,
  getAllColleges,
  getBranches,
  submitVerificationDetails,
} from "../api/api";
import { toast } from "react-toastify";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const VerificationDetailsForm = () => {
  const { getProfileId } = useAuth();
  const [profileId, setProfileId] = useState("");
  useEffect(() => {
    const profileId = getProfileId();
    setProfileId(profileId);
  }, [getProfileId]);
  const navigate = useNavigate();

  const [university, setUniversity] = useState("");
  const [college, setCollege] = useState("");
  const [formData, setFormData] = useState({
    University: "",
    dob: "",
    gender: "male",
    college: "",
    branch: "",
    year: "",
  });
  const [errors, setErrors] = useState({});
  const dateInputRef = useRef(null);

  const {
    data: universities,
    isLoading: universityLoading,
    isError: universityError,
  } = useQuery({
    queryKey: ["universities"],
    queryFn: getAllUniversities,
  });

  const {
    data: colleges,
    isLoading: collegeLoading,
    isError: collegeError,
  } = useQuery({
    queryKey: ["colleges", university],
    queryFn: () => getAllColleges(university),
    enabled: !!university,
  });

  const {
    data: branches,
    isLoading: branchLoading,
    isError: branchError,
  } = useQuery({
    queryKey: ["branches", college],
    queryFn: () => getBranches(college),
    enabled: !!college,
  });

  const {mutate, isPending} = useMutation({
    mutationFn: (data) => {
      const profileId = getProfileId();
      if (!profileId) {
        throw new Error("Profile ID not found");
      }
      return submitVerificationDetails(profileId, data); 
    },
    onSuccess: (data) => {
      toast.success("Details submitted successfully!");
      navigate("/all-subjects"); 
    },
    onError: (error) => {
      console.error("Form submission failed:", error);
      toast.error("Failed to submit details. Please try again later.");
    },
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.University) newErrors.University = "University is required.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    if (!formData.college) newErrors.college = "College is required.";
    if (!formData.branch) newErrors.branch = "Branch is required.";
    if (!formData.year) newErrors.year = "Year is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error for the current field
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const data = {
      universityId: formData.University,
      dateOfBirth: formData.dob,
      gender: formData.gender.toUpperCase(),
      collegeId: formData.college,
      branchId: formData.branch,
      year: formData.year,
    };
    mutate(data);
  };

  const handleCalendarClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  return (
    <div className="verification-form-container">
      <form className="form-card"  onSubmit={handleSubmit} noValidate>
        <div className="form-title details-form-heading-black">
          Set up your details!
        </div>

        {/* University Selection */}
        <div  >
          <img
            src={collegeIcon}
            alt="University Icon"
          />
          <select
            name="University"
            value={formData.University}
            onChange={(e) => {
              const selectedUniversity = e.target.value;
              setUniversity(selectedUniversity);
              setFormData({
                ...formData,
                University: selectedUniversity,
                college: "",
                branch: "",
              });
              setCollege("");
              setErrors({ ...errors, University: "" });
            }}
            required
          >
            <option value="" disabled>
              Select your university
            </option>
            {universityLoading && <option>Loading...</option>}
            {universityError && <option>Error fetching universities</option>}
            {universities?.map((uni) => (
              <option key={uni.universityId} value={uni.universityId}>
                {uni.universityName}
              </option>
            ))}
          </select>
          {errors.University && (
            <p className="error-text">{errors.University}</p>
          )}
        </div>

        {/* Date of Birth Input */}
        <div className="form-field calendar-input">
          <img
            src={calenderIcon}
            alt="Calendar Icon"
            className="detail-form-icon"
            onClick={handleCalendarClick}
            style={{ cursor: "pointer" }}
          />
          <input
            ref={dateInputRef}
            type="date"
            name="dob"
            value={formData.dob}
            onChange={(e) => {
              setErrors({ ...errors, dob: "" });
              handleChange(e);
            }}
            required
            className="hidden-date-input"
          />
          {errors.dob && <p className="error-text">{errors.dob}</p>}
        </div>

        {/* Gender Selection */}
        <div className="gender-selection">
          {["male", "female", "non-binary"].map((gender) => (
            <button
              key={gender}
              type="button"
              className={`${formData.gender === gender ? "selected" : ""}`}
              onClick={() => setFormData({ ...formData, gender })}
            >
              <img
                className={`form-icon-gender ${gender}`}
                src={
                  gender === "male"
                    ? male
                    : gender === "female"
                    ? female
                    : nonBinary
                }
                alt={`${gender} Icon`}
              />
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </button>
          ))}
        </div>

        {/* College Selection */}
        <div className="form-field">
          <img
            className="detail-form-icon"
            src={collegeIcon}
            alt="College Icon"
          />
          <select
            name="college"
            value={formData.college}
            onChange={(e) => {
              const selectedCollege = e.target.value;
              setCollege(selectedCollege);
              setFormData({
                ...formData,
                college: selectedCollege,
                branch: "",
              });
              setErrors({ ...errors, college: "" });
            }}
            disabled={!university}
            required
          >
            <option value="" disabled>
              Select your college
            </option>

            {collegeLoading && <option>Loading...</option>}
            {collegeError && <option>Error fetching colleges</option>}
            {colleges?.map((college) => (
              <option key={college.id} value={college.id}>
                {college.name}
              </option>
            ))}
          </select>
          {errors.college && <p className="error-text">{errors.college}</p>}
        </div>

        {/* Branch Selection */}
        <div className="form-field">
          <img
            className="detail-form-icon"
            src={collegeIcon}
            alt="Branch Icon"
          />
          <select
            name="branch"
            value={formData.branch}
            onChange={(e) => {
              setErrors({ ...errors, branch: "" });
              setFormData({ ...formData, branch: e.target.value });
            }}
            disabled={!college}
            required
          >
            <option value="" disabled>
              Select your branch
            </option>
            {branchLoading && <option>Loading...</option>}
            {branchError && <option>Error fetching branches</option>}
            {branches?.map((branch) => (
              <option key={branch.branchId} value={branch.branchId}>
                {branch.branchName}
              </option>
            ))}
          </select>
          {errors.branch && <p className="error-text">{errors.branch}</p>}
        </div>

        {/* Year Selection */}
        <div className="form-field">
          <img className="detail-form-icon" src={collegeIcon} alt="Year Icon" />
          <select
            name="year"
            value={formData.year}
            onChange={(e) => {
              setErrors({ ...errors, year: "" });
              handleChange(e);
            }}
            required
          >
            <option value="" disabled>
              Select your year
            </option>
            {[
              {
                year: "1st year",
                yearId: 1,
              },
              {
                year: "2nd year",
                yearId: 2,
              },
              {
                year: "3rd year",
                yearId: 3,
              },
              {
                year: "4th year",
                yearId: 4,
              },
            ].map((year, index) => (
              <option key={year.yearId} value={year.yearId}>
                {year.year}
              </option>
            ))}
          </select>
          {errors.year && <p className="error-text">{errors.year}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          {isPending ? "Submitting..." : "Submit"}
        </button>
        <div className="skip-text font-paragraph-black" onClick={navigate("/all-subjects")}>Skip for now</div>
      </form>
    </div>
  );
};

export default VerificationDetailsForm;
