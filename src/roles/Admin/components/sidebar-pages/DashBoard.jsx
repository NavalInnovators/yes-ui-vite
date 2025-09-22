import { useState, useEffect } from "react";

// Mock data - in real app, this would come from API
const dashboardData = {
  queries: {
    total: 156,
    active: 89,
    resolved: 45,
    urgent: 12,
    today: 8
  },
  forms: {
    total: 234,
    new: 67,
    answered: 123,
    closed: 44,
    today: 15
  },
  users: {
    total: 1247,
    active: 1189,
    disabled: 58,
    creators: 89,
    reviewers: 45,
    today: 23
  },
  earnings: {
    totalPaid: 45600,
    pendingPayouts: 8900,
    thisMonth: 12300
  },
  recentActivity: [
    {
      id: 1,
      type: "query",
      user: "Anita Sharma",
      action: "submitted a new query",
      subject: "Mathematics",
      time: "2 minutes ago",
      urgent: true
    },
    {
      id: 2,
      type: "form",
      user: "Rahul Kumar",
      action: "submitted contact form",
      subject: "Course Inquiry",
      time: "15 minutes ago",
      urgent: false
    },
    {
      id: 3,
      type: "user",
      user: "Meera Singh",
      action: "created new account",
      subject: "Creator",
      time: "1 hour ago",
      urgent: false
    },
    {
      id: 4,
      type: "earnings",
      user: "John Doe",
      action: "withdrew earnings",
      subject: "₹2,500",
      time: "2 hours ago",
      urgent: false
    }
  ]
};

function StatCard({ title, value, subtitle, icon, color, urgent = false }) {
  return (
    <div className={`border border-light-border dark:border-dark-border rounded-[10px] p-[20px] ${urgent ? 'border-red-300 bg-red-50 dark:bg-red-950/20' : ''}`}>
      <div className="flex items-center justify-between mb-[10px]">
        <h3 className="text-[14px] font-medium text-gray-600 dark:text-gray-300">{title}</h3>
        {urgent && <span className="text-[12px] px-[6px] py-[2px] rounded-[4px] bg-red-100 text-red-700">Urgent</span>}
      </div>
      <div className="flex items-center gap-[10px]">
        <div className={`p-[8px] rounded-[8px] ${color}`}>
          {icon}
        </div>
        <div>
          <p className="text-[24px] font-bold">{value}</p>
          {subtitle && <p className="text-[12px] text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ activity }) {
  const getTypeColor = (type) => {
    switch (type) {
      case 'query': return 'bg-blue-100 text-blue-700';
      case 'form': return 'bg-green-100 text-green-700';
      case 'user': return 'bg-purple-100 text-purple-700';
      case 'earnings': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'query': return '❓';
      case 'form': return '📝';
      case 'user': return '👤';
      case 'earnings': return '💰';
      default: return '📄';
    }
  };

  return (
    <div className="flex items-center gap-[12px] p-[12px] hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-[8px] transition">
      <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] ${getTypeColor(activity.type)}`}>
        {getTypeIcon(activity.type)}
      </div>
      <div className="flex-1">
        <p className="text-[14px]">
          <span className="font-medium">{activity.user}</span> {activity.action}
        </p>
        <p className="text-[12px] text-gray-500">{activity.subject} • {activity.time}</p>
      </div>
      {activity.urgent && (
        <span className="text-[10px] px-[4px] py-[2px] rounded-[4px] bg-red-100 text-red-600">
          Urgent
        </span>
      )}
    </div>
  );
}

export default function DashBoard() {
  const [data, setData] = useState(dashboardData);
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        queries: {
          ...prev.queries,
          today: prev.queries.today + Math.floor(Math.random() * 3)
        },
        forms: {
          ...prev.forms,
          today: prev.forms.today + Math.floor(Math.random() * 2)
        }
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col gap-[20px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-bold">Admin Dashboard</h1>
          <p className="text-[14px] text-gray-600 dark:text-gray-300">Overview of all management areas</p>
        </div>
        <div className="flex items-center gap-[10px]">
          <select
            className="border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[15px]">
        <StatCard
          title="Total Queries"
          value={data.queries.total}
          subtitle={`${data.queries.today} today`}
          icon="❓"
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Active Queries"
          value={data.queries.active}
          subtitle={`${data.queries.urgent} urgent`}
          icon="⏳"
          color="bg-orange-100 text-orange-600"
          urgent={data.queries.urgent > 5}
        />
        <StatCard
          title="Form Submissions"
          value={data.forms.total}
          subtitle={`${data.forms.today} today`}
          icon="📝"
          color="bg-green-100 text-green-600"
        />
        <StatCard
          title="Total Users"
          value={data.users.total}
          subtitle={`${data.users.today} new today`}
          icon="��"
          color="bg-purple-100 text-purple-600"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
        <StatCard
          title="Resolved Queries"
          value={data.queries.resolved}
          subtitle="This month"
          icon="✅"
          color="bg-green-100 text-green-600"
        />
        <StatCard
          title="Answered Forms"
          value={data.forms.answered}
          subtitle="This month"
          icon="💬"
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Active Creators"
          value={data.users.creators}
          subtitle="Platform contributors"
          icon="✍️"
          color="bg-yellow-100 text-yellow-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px]">
        {/* Query Management Overview */}
        <div className="lg:col-span-2 border border-light-border dark:border-dark-border rounded-[10px] p-[20px]">
          <div className="flex items-center justify-between mb-[15px]">
            <h3 className="text-[18px] font-semibold">Query Management</h3>
            <button className="text-[14px] text-blue-600 hover:text-blue-700">View All</button>
          </div>
          
          <div className="grid grid-cols-2 gap-[15px] mb-[20px]">
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-[8px] p-[15px]">
              <div className="flex items-center gap-[10px] mb-[8px]">
                <span className="text-[20px]">📊</span>
                <div>
                  <p className="text-[12px] text-gray-600 dark:text-gray-300">Total Submissions</p>
                  <p className="text-[18px] font-bold">{data.queries.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 rounded-[8px] p-[15px]">
              <div className="flex items-center gap-[10px] mb-[8px]">
                <span className="text-[20px]">✅</span>
                <div>
                  <p className="text-[12px] text-gray-600 dark:text-gray-300">Resolved</p>
                  <p className="text-[18px] font-bold">{data.queries.resolved}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-[10px]">
            <div className="flex items-center justify-between">
              <span className="text-[14px]">Active Queries</span>
              <span className="text-[14px] font-medium">{data.queries.active}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px]">Urgent Queries</span>
              <span className="text-[14px] font-medium text-red-600">{data.queries.urgent}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px]">Today's New</span>
              <span className="text-[14px] font-medium">{data.queries.today}</span>
            </div>
          </div>
        </div>

        {/* Forms Management Overview */}
        <div className="border border-light-border dark:border-dark-border rounded-[10px] p-[20px]">
          <div className="flex items-center justify-between mb-[15px]">
            <h3 className="text-[18px] font-semibold">Forms Management</h3>
            <button className="text-[14px] text-blue-600 hover:text-blue-700">View All</button>
          </div>
          
          <div className="space-y-[15px]">
            <div className="text-center">
              <p className="text-[24px] font-bold">{data.forms.total}</p>
              <p className="text-[12px] text-gray-600 dark:text-gray-300">Total Submissions</p>
            </div>
            
            <div className="space-y-[8px]">
              <div className="flex items-center justify-between">
                <span className="text-[14px]">New</span>
                <span className="text-[14px] font-medium">{data.forms.new}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px]">Answered</span>
                <span className="text-[14px] font-medium text-green-600">{data.forms.answered}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px]">Closed</span>
                <span className="text-[14px] font-medium">{data.forms.closed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Management & Earnings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
        {/* User Management Overview */}
        <div className="border border-light-border dark:border-dark-border rounded-[10px] p-[20px]">
          <div className="flex items-center justify-between mb-[15px]">
            <h3 className="text-[18px] font-semibold">User Management</h3>
            <button className="text-[14px] text-blue-600 hover:text-blue-700">View All</button>
          </div>
          
          <div className="grid grid-cols-2 gap-[15px] mb-[15px]">
            <div className="text-center">
              <p className="text-[20px] font-bold">{data.users.total}</p>
              <p className="text-[12px] text-gray-600 dark:text-gray-300">Total Users</p>
            </div>
            <div className="text-center">
              <p className="text-[20px] font-bold text-green-600">{data.users.active}</p>
              <p className="text-[12px] text-gray-600 dark:text-gray-300">Active</p>
            </div>
          </div>

          <div className="space-y-[8px]">
            <div className="flex items-center justify-between">
              <span className="text-[14px]">Creators</span>
              <span className="text-[14px] font-medium">{data.users.creators}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px]">Reviewers</span>
              <span className="text-[14px] font-medium">{data.users.reviewers}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px]">Disabled</span>
              <span className="text-[14px] font-medium text-red-600">{data.users.disabled}</span>
            </div>
          </div>
        </div>

        {/* Earnings Overview */}
        <div className="border border-light-border dark:border-dark-border rounded-[10px] p-[20px]">
          <div className="flex items-center justify-between mb-[15px]">
            <h3 className="text-[18px] font-semibold">Earnings Overview</h3>
            <button className="text-[14px] text-blue-600 hover:text-blue-700">View Details</button>
          </div>
          
          <div className="space-y-[15px]">
            <div className="text-center">
              <p className="text-[24px] font-bold">₹{data.earnings.totalPaid.toLocaleString()}</p>
              <p className="text-[12px] text-gray-600 dark:text-gray-300">Total Paid Out</p>
            </div>
            
            <div className="space-y-[8px]">
              <div className="flex items-center justify-between">
                <span className="text-[14px]">Pending Payouts</span>
                <span className="text-[14px] font-medium text-orange-600">₹{data.earnings.pendingPayouts.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px]">This Month</span>
                <span className="text-[14px] font-medium text-green-600">₹{data.earnings.thisMonth.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="border border-light-border dark:border-dark-border rounded-[10px] p-[20px]">
        <div className="flex items-center justify-between mb-[15px]">
          <h3 className="text-[18px] font-semibold">Recent Activity</h3>
          <button className="text-[14px] text-blue-600 hover:text-blue-700">View All</button>
        </div>
        
        <div className="space-y-[8px]">
          {data.recentActivity.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[15px]">
        <div className="border border-light-border dark:border-dark-border rounded-[10px] p-[20px] text-center">
          <div className="text-[32px] mb-[10px]">📊</div>
          <h4 className="text-[16px] font-semibold mb-[8px]">Analytics</h4>
          <p className="text-[12px] text-gray-600 dark:text-gray-300 mb-[15px]">View detailed analytics and reports</p>
          <button className="w-full px-[12px] py-[8px] rounded-[8px] bg-blue-600 text-white hover:bg-blue-700">
            View Analytics
          </button>
        </div>
        
        <div className="border border-light-border dark:border-dark-border rounded-[10px] p-[20px] text-center">
          <div className="text-[32px] mb-[10px]">⚙️</div>
          <h4 className="text-[16px] font-semibold mb-[8px]">Settings</h4>
          <p className="text-[12px] text-gray-600 dark:text-gray-300 mb-[15px]">Configure system settings</p>
          <button className="w-full px-[12px] py-[8px] rounded-[8px] bg-gray-600 text-white hover:bg-gray-700">
            Open Settings
          </button>
        </div>
        
        <div className="border border-light-border dark:border-dark-border rounded-[10px] p-[20px] text-center">
          <div className="text-[32px] mb-[10px]">📈</div>
          <h4 className="text-[16px] font-semibold mb-[8px]">Reports</h4>
          <p className="text-[12px] text-gray-600 dark:text-gray-300 mb-[15px]">Generate system reports</p>
          <button className="w-full px-[12px] py-[8px] rounded-[8px] bg-green-600 text-white hover:bg-green-700">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}