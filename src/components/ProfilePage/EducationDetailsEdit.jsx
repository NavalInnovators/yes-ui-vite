import "./EducationDetailsEdit.css";
import { BackArrow, hat } from "../../assets";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEduData, getAllUniversities, getAllColleges, getBranches, updateEduData } from "../../api/api";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const EducationDetailsEdit = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedUniversityId, setSelectedUniversityId] = useState(null);
  const [selectedCollegeId, setSelectedCollegeId] = useState(null);
  const [formData, setFormData] = useState({
    universityId: 0,
    collegeId: 0,
    branchId: 0,
    year: 0
  });

  // Fetch initial education data
  const { data: eduData, isLoading: isLoadingEduData } = useQuery({
    queryKey: ['educationData'],
    queryFn: getEduData,
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch Education Details");
    }
  });

  // Fetch universities
  const { data: universities, isLoading: isLoadingUniversities } = useQuery({
    queryKey: ['universities'],
    queryFn: getAllUniversities,
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch Universities");
    }
  });

  // Update education data mutation
  const { mutate: updateEducation, isLoading: isUpdating, status } = useMutation({
    mutationFn: updateEduData,
    onSuccess: () => {
      toast.success("Education details updated successfully");
      queryClient.invalidateQueries(['educationData']);
      navigate(-1);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update education details");
    }
  });

  // Fetch colleges based on selected university
  const { data: colleges, isLoading: isLoadingColleges } = useQuery({
    queryKey: ['colleges', selectedUniversityId],
    queryFn: () => getAllColleges(selectedUniversityId),
    enabled: !!selectedUniversityId,
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch Colleges");
    }
  });

  // Fetch branches based on selected college
  const { data: branches, isLoading: isLoadingBranches } = useQuery({
    queryKey: ['branches', selectedCollegeId],
    queryFn: () => getBranches(selectedCollegeId),
    enabled: !!selectedCollegeId,
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch Branches");
    }
  });

  useEffect(() => {
    if (eduData && universities) {
      // Set the university ID from eduData
      const universityId = parseInt(eduData.universityId) || 0;
      setSelectedUniversityId(universityId);
      
      setFormData(prev => ({
        ...prev,
        universityId,
        collegeId: parseInt(eduData.collegeId) || 0,
        branchId: parseInt(eduData.branchId) || 0,
        year: parseInt(eduData.year) || 0
      }));
    }
  }, [eduData, universities]);

  // Set college ID when colleges are loaded
  useEffect(() => {
    if (colleges && eduData?.collegeId) {
      setSelectedCollegeId(parseInt(eduData.collegeId));
    }
  }, [colleges, eduData]);

  const handleUniversityChange = (e) => {
    const universityId = parseInt(e.target.value) || 0;
    setSelectedUniversityId(universityId);
    setSelectedCollegeId(null);
    setFormData(prev => ({
      ...prev,
      universityId,
      collegeId: 0,
      branchId: 0
    }));
  };

  const handleCollegeChange = (e) => {
    const collegeId = parseInt(e.target.value) || 0;
    setSelectedCollegeId(collegeId);
    setFormData(prev => ({
      ...prev,
      collegeId,
      branchId: 0
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  const handleSave = () => {
    const payload = {
      universityId: parseInt(formData.universityId) || 0,
      collegeId: parseInt(formData.collegeId) || 0,
      branchId: parseInt(formData.branchId) || 0,
      year: parseInt(formData.year) || 0
    };

    if (!payload.universityId || !payload.collegeId || !payload.branchId || !payload.year) {
      toast.error("Please fill in all fields");
      return;
    }

    updateEducation(payload);
  };

  const isInitialLoading = isLoadingEduData || isLoadingUniversities;

  return (
    <div className="education-details-edit-container">
      <div className="gradient-strip">
        <div className="gradient-strip-heading-left">
          <div className="back-arrow">
            <img onClick={() => navigate(-1)} src={BackArrow} alt="BackArrow" />
          </div>
          Education Details
        </div>
      </div>

      <div className="education-edit-main">
        <div className="education-edit-main-content">
          <section id="education" className="profile-sections">
            <div className="section-header">
              <div className="heading-500-30-black profile-section-heading">
                Edit Education Details
              </div>
            </div>
            <div className="education-details font-paragraph-black-light">
              <div className="profile-sec-full-cell edit-edu-sec-first-cell">
                <img src={hat} alt="Hat Icon" />
                <span>University:</span>
                <select
                  name="universityId"
                  value={formData.universityId || ""}
                  onChange={handleUniversityChange}
                  className="edit-profile-sec-select edit-edu-sec-select"
                  disabled={isInitialLoading}
                >
                  <option value="">Select University</option>
                  {universities?.map((university) => (
                    <option key={university.universityId} value={university.universityId}>
                      {university.universityName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="profile-sec-full-cell">
                <img src={hat} alt="Hat Icon" />
                <span>College:</span>
                <select
                  name="collegeId"
                  value={formData.collegeId || ""}
                  onChange={handleCollegeChange}
                  className="edit-profile-sec-select edit-edu-sec-select"
                  disabled={!selectedUniversityId || isLoadingColleges || isInitialLoading}
                >
                  <option value="">Select College</option>
                  {colleges?.map((college) => (
                    <option key={college.id} value={college.id}>
                      {college.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="profile-sec-full-cell">
                <img src={hat} alt="Hat Icon" />
                <span>Branch:</span>
                <select
                  name="branchId"
                  value={formData.branchId || ""}
                  onChange={handleChange}
                  className="edit-profile-sec-select edit-edu-sec-select"
                  disabled={!selectedCollegeId || isLoadingBranches || isInitialLoading}
                >
                  <option value="">Select Branch</option>
                  {branches?.map((branch) => (
                    <option key={branch.branchId} value={branch.branchId}>
                      {branch.branchName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="profile-sec-full-cell edit-edu-sec-last-cell">
                <img src={hat} alt="Hat Icon" />
                <span>Year:</span>
                <select
                  name="year"
                  value={formData.year || ""}
                  onChange={handleChange}
                  className="edit-profile-sec-select edit-edu-sec-select"
                  disabled={isInitialLoading}
                >
                  <option value="">Select Year</option>
                  <option value="1">1st</option>
                  <option value="2">2nd</option>
                  <option value="3">3rd</option>
                  <option value="4">4th</option>
                </select>
              </div>

              <div className="education-edit-submit">
                <button
                  className="profile-edit-submit-button font-black-btn password-button colourful-border-btn"
                  onClick={handleSave}
                  disabled={isUpdating || isInitialLoading || status === "pending"}
                >
                  {status === "pending" ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EducationDetailsEdit;