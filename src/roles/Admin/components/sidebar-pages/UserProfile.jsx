import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const initialUserData = {
  // Basic Info
  firstName: "John",
  lastName: "Doe",
  username: "johndoe123",
  dateOfBirth: "1990-01-15",
  gender: "Male",
  email: "john@example.com",
  phone: "+91-9000000001",
  profileImage: null,
  
  // Education Details
  university: "AKTU",
  collegeName: "ABES EC",
  branch: "ECE",
  year: "2nd",
  
  // KYC Details (for Creator/Reviewer)
  userType: "Professional", // Student, Professional, Others
  qualificationMarksheet: null,
  letterOfRecommendation: null,
  governmentId: null,
  
  // Creator specific
  topicAreas: ["Technology", "Finance"],
  hasArticleExperience: true,
  sampleWorkLink: "https://example.com/sample",
  motivation: "I want to share knowledge and help students",
  contentGuidelinesAccepted: true,
  
  // Reviewer specific
  skillValidationAnswers: "Lorem ipsum dolor sit amet...",
  skillValidationFiles: null,
  
  // Account Status
  role: "Creator",
  status: "Active",
  createdAt: new Date().toISOString(),
  lastLogin: new Date(Date.now() - 1000 * 60 * 30).toISOString(),

  // Subject Purchases (for all users)
  subjectPurchases: [
    {
      id: 1,
      subject: "Mathematics",
      courseCode: "KHU702",
      university: "AKTU",
      program: "CEE",
      plan: "Basic", // Basic or Pro
      price: 110,
      purchaseDate: "2024-01-15T10:30:00Z",
      expiryDate: "2025-01-15T23:59:59Z",
      status: "Active", // Active, Expired, Cancelled
      paymentId: "PAY_001"
    },
    {
      id: 2,
      subject: "Physics",
      courseCode: "KCS023",
      university: "AKTU",
      program: "CEE",
      plan: "Pro",
      price: 150,
      purchaseDate: "2024-02-01T14:20:00Z",
      expiryDate: "2025-02-01T23:59:59Z",
      status: "Active",
      paymentId: "PAY_002"
    }
  ],

  // Payment History
  paymentHistory: [
    {
      id: 1,
      paymentId: "PAY_001",
      amount: 110,
      subject: "Mathematics",
      plan: "Basic",
      status: "Success",
      timestamp: "2024-01-15T10:30:00Z",
      paymentMethod: "UPI",
      transactionId: "TXN_123456789"
    },
    {
      id: 2,
      paymentId: "PAY_002",
      amount: 150,
      subject: "Physics",
      plan: "Pro",
      status: "Success",
      timestamp: "2024-02-01T14:20:00Z",
      paymentMethod: "Card",
      transactionId: "TXN_987654321"
    },
    {
      id: 3,
      paymentId: "PAY_003",
      amount: 110,
      subject: "Chemistry",
      plan: "Basic",
      status: "Failed",
      timestamp: "2024-01-20T09:15:00Z",
      paymentMethod: "UPI",
      transactionId: "TXN_456789123"
    }
  ],

  // Creator/Reviewer Earnings
  earnings: {
    totalEarnings: 999,
    currentBalance: 500,
    totalWithdrawn: 499,
    monthlyEarnings: [
      { month: "January", year: 2024, amount: 350, submissions: 18 },
      { month: "February", year: 2024, amount: 400, submissions: 22 },
      { month: "March", year: 2024, amount: 249, submissions: 15 }
    ],
    taskHistory: [
      {
        id: 1,
        type: "Answer", // Answer or Review
        subject: "Mathematics",
        questionId: "Q_001",
        status: "Accepted",
        amount: 25,
        completedAt: "2024-01-15T10:30:00Z",
        rating: 4.5
      },
      {
        id: 2,
        type: "Review",
        subject: "Physics",
        questionId: "Q_002",
        status: "Completed",
        amount: 15,
        completedAt: "2024-01-16T14:20:00Z",
        rating: 5.0
      }
    ],
    withdrawalHistory: [
      {
        id: 1,
        amount: 200,
        method: "UPI",
        status: "Completed",
        timestamp: "2024-01-10T16:30:00Z",
        transactionId: "WTH_001"
      },
      {
        id: 2,
        amount: 299,
        method: "Bank Transfer",
        status: "Pending",
        timestamp: "2024-02-01T09:15:00Z",
        transactionId: "WTH_002"
      }
    ]
  }
};

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || initialUserData;
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const [activeTab, setActiveTab] = useState("basic");
  const [earningsFilter, setEarningsFilter] = useState("all"); // all, month, year
  const [selectedPeriod, setSelectedPeriod] = useState("2024");

  function handleSave() {
    // Here you would typically save to backend
    console.log("Saving user data:", formData);
    setIsEditing(false);
  }

  function handleCancel() {
    setFormData(user);
    setIsEditing(false);
  }

  function updateField(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  function formatDate(dt) {
    try {
      return new Date(dt).toLocaleString();
    } catch {
      return dt;
    }
  }

  function getFilteredEarnings() {
    if (earningsFilter === "all") return formData.earnings.monthlyEarnings;
    
    const currentYear = new Date().getFullYear();
    const year = selectedPeriod;
    
    if (earningsFilter === "year") {
      return formData.earnings.monthlyEarnings.filter(e => e.year.toString() === year);
    }
    
    return formData.earnings.monthlyEarnings;
  }

  function getTotalEarningsForPeriod() {
    const filtered = getFilteredEarnings();
    return filtered.reduce((sum, month) => sum + month.amount, 0);
  }

  return (
    <div className="w-full flex flex-col gap-[20px] border border-light-border dark:border-dark-border p-[30px] rounded-[10px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[15px]">
          <button
            className="px-[10px] py-[6px] rounded-[8px] border border-light-border dark:border-dark-border"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
          <div>
            <h2 className="text-[20px] font-semibold">{formData.firstName} {formData.lastName}</h2>
            <p className="text-[14px] text-gray-600 dark:text-gray-300">ID: {id}</p>
          </div>
        </div>
        <div className="flex gap-[10px]">
          {isEditing ? (
            <>
              <button
                className="px-[12px] py-[8px] rounded-[8px] border border-light-border dark:border-dark-border"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-[12px] py-[8px] rounded-[8px] bg-green-600 text-white hover:bg-green-700"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              className="px-[12px] py-[8px] rounded-[8px] bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-[10px] border-b border-light-border dark:border-dark-border">
        {["basic", "education", "kyc", "purchases", "payments", "earnings", "account"].map((tab) => (
          <button
            key={tab}
            className={`px-[15px] py-[8px] rounded-t-[8px] text-[14px] ${
              activeTab === tab
                ? "bg-blue-50 dark:bg-blue-950/30 text-blue-700 border-b-2 border-blue-600"
                : "hover:bg-gray-50 dark:hover:bg-zinc-900"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} {tab === "purchases" ? "& Subjects" : ""}
          </button>
        ))}
      </div>

      {/* Basic Info Tab */}
      {activeTab === "basic" && (
        <div className="grid grid-cols-2 gap-[20px]">
          <div className="space-y-[15px]">
            <div>
              <label className="block text-[14px] font-medium mb-[5px]">First Name</label>
              <input
                className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                value={formData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium mb-[5px]">Last Name</label>
              <input
                className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                value={formData.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium mb-[5px]">Username</label>
              <input
                className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                value={formData.username}
                onChange={(e) => updateField("username", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium mb-[5px]">Date of Birth</label>
              <input
                type="date"
                className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                value={formData.dateOfBirth}
                onChange={(e) => updateField("dateOfBirth", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="space-y-[15px]">
            <div>
              <label className="block text-[14px] font-medium mb-[5px]">Gender</label>
              <select
                className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                value={formData.gender}
                onChange={(e) => updateField("gender", e.target.value)}
                disabled={!isEditing}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-[14px] font-medium mb-[5px]">Email</label>
              <input
                type="email"
                className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium mb-[5px]">Phone</label>
              <input
                className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium mb-[5px]">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                disabled={!isEditing}
              />
              <p className="text-[12px] text-gray-500 mt-[5px]">File format should be JPG, PNG under 20 kb</p>
            </div>
          </div>
        </div>
      )}

            {/* Subject Purchases Tab */}
            {activeTab === "purchases" && (
        <div className="space-y-[20px]">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-semibold">Subject Purchases</h3>
            <button className="px-[12px] py-[8px] rounded-[8px] bg-green-600 text-white hover:bg-green-700">
              Add Purchase
            </button>
          </div>
          
          <div className="grid gap-[15px]">
            {formData.subjectPurchases.map((purchase) => (
              <div key={purchase.id} className="border border-light-border dark:border-dark-border rounded-[10px] p-[15px]">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-[10px] mb-[8px]">
                      <h4 className="font-medium">{purchase.subject}</h4>
                      <span className={`text-[12px] px-[6px] py-[2px] rounded-[4px] ${
                        purchase.status === "Active" 
                          ? "bg-green-100 text-green-700" 
                          : purchase.status === "Expired"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {purchase.status}
                      </span>
                      <span className={`text-[12px] px-[6px] py-[2px] rounded-[4px] ${
                        purchase.plan === "Pro" 
                          ? "bg-purple-100 text-purple-700" 
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {purchase.plan} Plan
                      </span>
                    </div>
                    <div className="text-[14px] text-gray-600 dark:text-gray-300">
                      <p>{purchase.courseCode} | {purchase.university} | {purchase.program}</p>
                      <p>₹{purchase.price} | Purchased: {formatDate(purchase.purchaseDate)}</p>
                      <p>Expires: {formatDate(purchase.expiryDate)}</p>
                    </div>
                  </div>
                  <div className="flex gap-[8px]">
                    <button className="px-[8px] py-[4px] rounded-[6px] border border-light-border dark:border-dark-border text-[12px]">
                      Edit
                    </button>
                    <button className="px-[8px] py-[4px] rounded-[6px] bg-red-600 text-white text-[12px]">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment History Tab */}
      {activeTab === "payments" && (
        <div className="space-y-[20px]">
          <h3 className="text-[16px] font-semibold">Payment History</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border border-light-border dark:border-dark-border rounded-[10px] overflow-hidden">
              <thead className="bg-gray-50 dark:bg-zinc-900">
                <tr>
                  <th className="px-4 py-3 border-b border-light-border dark:border-dark-border text-left">Payment ID</th>
                  <th className="px-4 py-3 border-b border-light-border dark:border-dark-border text-left">Amount</th>
                  <th className="px-4 py-3 border-b border-light-border dark:border-dark-border text-left">Subject</th>
                  <th className="px-4 py-3 border-b border-light-border dark:border-dark-border text-left">Plan</th>
                  <th className="px-4 py-3 border-b border-light-border dark:border-dark-border text-left">Status</th>
                  <th className="px-4 py-3 border-b border-light-border dark:border-dark-border text-left">Method</th>
                  <th className="px-4 py-3 border-b border-light-border dark:border-dark-border text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {formData.paymentHistory.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900">
                    <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{payment.paymentId}</td>
                    <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">₹{payment.amount}</td>
                    <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{payment.subject}</td>
                    <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{payment.plan}</td>
                    <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">
                      <span className={`text-[12px] px-[6px] py-[2px] rounded-[4px] ${
                        payment.status === "Success" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{payment.paymentMethod}</td>
                    <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{formatDate(payment.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Earnings Tab (for Creator/Reviewer) */}
      {activeTab === "earnings" && (formData.role === "Creator" || formData.role === "Reviewer") && (
        <div className="space-y-[20px]">
          {/* Earnings Summary */}
          <div className="grid grid-cols-3 gap-[15px]">
            <div className="border border-light-border dark:border-dark-border rounded-[10px] p-[15px]">
              <h4 className="text-[14px] font-medium text-gray-600 dark:text-gray-300">Total Earnings</h4>
              <p className="text-[24px] font-bold">₹{formData.earnings.totalEarnings}</p>
            </div>
            <div className="border border-light-border dark:border-dark-border rounded-[10px] p-[15px]">
              <h4 className="text-[14px] font-medium text-gray-600 dark:text-gray-300">Current Balance</h4>
              <p className="text-[24px] font-bold">₹{formData.earnings.currentBalance}</p>
            </div>
            <div className="border border-light-border dark:border-dark-border rounded-[10px] p-[15px]">
              <h4 className="text-[14px] font-medium text-gray-600 dark:text-gray-300">Total Withdrawn</h4>
              <p className="text-[24px] font-bold">₹{formData.earnings.totalWithdrawn}</p>
            </div>
          </div>

          {/* Earnings Filter */}
          <div className="flex gap-[10px] items-center">
            <select
              className="border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
              value={earningsFilter}
              onChange={(e) => setEarningsFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="year">By Year</option>
              <option value="month">By Month</option>
            </select>
            {earningsFilter === "year" && (
              <select
                className="border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            )}
            <div className="text-[14px] font-medium">
              Period Total: ₹{getTotalEarningsForPeriod()}
            </div>
          </div>

          {/* Monthly Earnings */}
          <div className="space-y-[10px]">
            <h4 className="text-[16px] font-semibold">Monthly Earnings</h4>
            <div className="grid gap-[10px]">
              {getFilteredEarnings().map((month, idx) => (
                <div key={idx} className="border border-light-border dark:border-dark-border rounded-[8px] p-[12px]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{month.month} {month.year}</p>
                      <p className="text-[14px] text-gray-600 dark:text-gray-300">{month.submissions} submissions</p>
                    </div>
                    <p className="text-[18px] font-bold">₹{month.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Task History */}
          <div className="space-y-[10px]">
            <h4 className="text-[16px] font-semibold">Task History</h4>
            <div className="overflow-x-auto">
              <table className="w-full border border-light-border dark:border-dark-border rounded-[10px] overflow-hidden">
                <thead className="bg-gray-50 dark:bg-zinc-900">
                  <tr>
                    <th className="px-4 py-3 border-b border-light-border dark:border-dark-border text-left">Type</th>
                    <th className="px-4 py-3 border-b border-light-border dark:border-dark-border text-left">Subject</th>
                    <th className="px-4 py-3 border-b border-light-border dark:border-dark-border text-left">Status</th>
                    <th className="px-4 py-3 border-b border-light-border dark:border-dark-border text-left">Amount</th>
                    <th className="px-4 py-3 border-b border-light-border dark:border-dark-border text-left">Rating</th>
                    <th className="px-4 py-3 border-b border-light-border dark:border-dark-border text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.earnings.taskHistory.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900">
                      <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{task.type}</td>
                      <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{task.subject}</td>
                      <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">
                        <span className={`text-[12px] px-[6px] py-[2px] rounded-[4px] ${
                          task.status === "Accepted" || task.status === "Completed"
                            ? "bg-green-100 text-green-700" 
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">₹{task.amount}</td>
                      <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{task.rating}⭐</td>
                      <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{formatDate(task.completedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Withdrawal History */}
          <div className="space-y-[10px]">
            <h4 className="text-[16px] font-semibold">Withdrawal History</h4>
            <div className="overflow-x-auto">
              <table className="w-full border border-light-border dark:border-dark-border rounded-[10px] overflow-hidden">
                <thead className="bg-gray-50 dark:bg-zinc-900">
                  <tr>
                    <th className="px-4 py-3 border-b border-light-border dark:border-dark-border text-left">Amount</th>
                    <th className="px-4 py-3 border-b border-light-border dark:border-dark-border text-left">Method</th>
                    <th className="px-4 py-3 border-b border-light-border dark:border-dark-border text-left">Status</th>
                    <th className="px-4 py-3 border-b border-light-border dark:border-dark-border text-left">Transaction ID</th>
                    <th className="px-4 py-3 border-b border-light-border dark:border-dark-border text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.earnings.withdrawalHistory.map((withdrawal) => (
                    <tr key={withdrawal.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900">
                      <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">₹{withdrawal.amount}</td>
                      <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{withdrawal.method}</td>
                      <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">
                        <span className={`text-[12px] px-[6px] py-[2px] rounded-[4px] ${
                          withdrawal.status === "Completed" 
                            ? "bg-green-100 text-green-700" 
                            : withdrawal.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {withdrawal.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{withdrawal.transactionId}</td>
                      <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{formatDate(withdrawal.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Education Tab */}
      {activeTab === "education" && (
        <div className="grid grid-cols-2 gap-[20px]">
          <div>
            <label className="block text-[14px] font-medium mb-[5px]">University</label>
            <input
              className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
              value={formData.university}
              onChange={(e) => updateField("university", e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium mb-[5px]">College Name</label>
            <input
              className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
              value={formData.collegeName}
              onChange={(e) => updateField("collegeName", e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium mb-[5px]">Branch</label>
            <input
              className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
              value={formData.branch}
              onChange={(e) => updateField("branch", e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium mb-[5px]">Year</label>
            <input
              className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
              value={formData.year}
              onChange={(e) => updateField("year", e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>
      )}

      {/* KYC Tab (for Creator/Reviewer) */}
      {activeTab === "kyc" && (formData.role === "Creator" || formData.role === "Reviewer") && (
        <div className="space-y-[20px]">
          <div>
            <label className="block text-[14px] font-medium mb-[5px]">User Type</label>
            <select
              className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
              value={formData.userType}
              onChange={(e) => updateField("userType", e.target.value)}
              disabled={!isEditing}
            >
              <option value="Student">Student</option>
              <option value="Professional">Professional</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-[15px]">
            <div>
              <label className="block text-[14px] font-medium mb-[5px]">Qualification Marksheet</label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                disabled={!isEditing}
              />
              <p className="text-[12px] text-gray-500 mt-[5px]">JPG, PNG under 100 kb</p>
            </div>
            <div>
              <label className="block text-[14px] font-medium mb-[5px]">Letter of Recommendation</label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                disabled={!isEditing}
              />
              <p className="text-[12px] text-gray-500 mt-[5px]">JPG, PNG under 100 kb</p>
            </div>
            <div>
              <label className="block text-[14px] font-medium mb-[5px]">Government ID</label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                disabled={!isEditing}
              />
              <p className="text-[12px] text-gray-500 mt-[5px]">JPG, PNG under 100 kb</p>
            </div>
          </div>

          {/* Creator specific fields */}
          {formData.role === "Creator" && (
            <div className="space-y-[15px]">
              <div>
                <label className="block text-[14px] font-medium mb-[5px]">Topic Areas of Interest</label>
                <div className="flex flex-wrap gap-[8px]">
                  {["Technology", "Finance", "Health", "Education"].map((topic) => (
                    <label key={topic} className="flex items-center gap-[5px]">
                      <input
                        type="checkbox"
                        checked={formData.topicAreas?.includes(topic)}
                        onChange={(e) => {
                          const areas = formData.topicAreas || [];
                          if (e.target.checked) {
                            updateField("topicAreas", [...areas, topic]);
                          } else {
                            updateField("topicAreas", areas.filter(t => t !== topic));
                          }
                        }}
                        disabled={!isEditing}
                      />
                      {topic}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[14px] font-medium mb-[5px]">Sample Work Link</label>
                <input
                  className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                  value={formData.sampleWorkLink}
                  onChange={(e) => updateField("sampleWorkLink", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium mb-[5px]">Motivation</label>
                <textarea
                  className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                  rows={3}
                  value={formData.motivation}
                  onChange={(e) => updateField("motivation", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          )}

          {/* Reviewer specific fields */}
          {formData.role === "Reviewer" && (
            <div>
              <label className="block text-[14px] font-medium mb-[5px]">Skill Validation Answers</label>
              <textarea
                className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                rows={4}
                value={formData.skillValidationAnswers}
                onChange={(e) => updateField("skillValidationAnswers", e.target.value)}
                disabled={!isEditing}
              />
              <div className="mt-[10px]">
                <label className="block text-[14px] font-medium mb-[5px]">Skill Validation Files</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                  disabled={!isEditing}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Account Tab */}
      {activeTab === "account" && (
        <div className="grid grid-cols-2 gap-[20px]">
          <div>
            <label className="block text-[14px] font-medium mb-[5px]">Role</label>
            <select
              className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
              value={formData.role}
              onChange={(e) => updateField("role", e.target.value)}
              disabled={!isEditing}
            >
              <option value="User">User</option>
              <option value="Creator">Creator</option>
              <option value="Reviewer">Reviewer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-[14px] font-medium mb-[5px]">Status</label>
            <select
              className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
              value={formData.status}
              onChange={(e) => updateField("status", e.target.value)}
              disabled={!isEditing}
            >
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
          <div>
            <label className="block text-[14px] font-medium mb-[5px]">Created At</label>
            <input
              className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
              value={new Date(formData.createdAt).toLocaleString()}
              disabled
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium mb-[5px]">Last Login</label>
            <input
              className="w-full border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
              value={formData.lastLogin ? new Date(formData.lastLogin).toLocaleString() : "Never"}
              disabled
            />
          </div>
        </div>
      )}
    </div>
  );
}