import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialUsers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+91-9000000001",
    role: "Admin",
    status: "Active",
    createdAt: new Date().toISOString(),
    lastLogin: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    profileImage: null
  },
  {
    id: 2,
    firstName: "Anita",
    lastName: "Sharma",
    email: "anita@example.com",
    phone: "+91-9000000002",
    role: "Creator",
    status: "Active",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    profileImage: null
  },
  {
    id: 3,
    firstName: "Rahul",
    lastName: "Kumar",
    email: "rahul@example.com",
    phone: "+91-9000000003",
    role: "Reviewer",
    status: "Disabled",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    profileImage: null
  },
  {
    id: 4,
    firstName: "Meera",
    lastName: "Singh",
    email: "meera@example.com",
    phone: "+91-9000000004",
    role: "User",
    status: "Active",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    lastLogin: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    profileImage: null
  }
];

const roles = ["All", "Admin", "User", "Creator", "Reviewer"];
const statuses = ["All", "Active", "Disabled"];

function formatDate(dt) {
  try {
    return new Date(dt).toLocaleString();
  } catch {
    return dt;
  }
}

function StatusBadge({ status }) {
  const base = "text-[12px] px-[8px] py-[2px] rounded-[6px] border";
  const map = {
    Active: `${base} border-green-300 text-green-700 bg-green-50 dark:bg-green-950/30`,
    Disabled: `${base} border-red-300 text-red-700 bg-red-50 dark:bg-red-950/30`,
  };
  return <span className={map[status] || base}>{status}</span>;
}

function RoleBadge({ role }) {
  const base = "text-[12px] px-[8px] py-[2px] rounded-[6px] border";
  const map = {
    Admin: `${base} border-purple-300 text-purple-700 bg-purple-50 dark:bg-purple-950/30`,
    Creator: `${base} border-blue-300 text-blue-700 bg-blue-50 dark:bg-blue-950/30`,
    Reviewer: `${base} border-orange-300 text-orange-700 bg-orange-50 dark:bg-orange-950/30`,
    User: `${base} border-gray-300 text-gray-700 bg-gray-50 dark:bg-zinc-900`,
  };
  return <span className={map[role] || base}>{role}</span>;
}

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "User"
  });

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        !search ||
        `${u.firstName} ${u.lastName} ${u.email} ${u.phone}`.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === "All" ? true : u.role === roleFilter;
      const matchStatus = statusFilter === "All" ? true : u.status === statusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  function createUser(e) {
    e.preventDefault();
    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.phone || !newUser.password) return;
    
    const user = {
      id: Math.max(...users.map(u => u.id)) + 1,
      ...newUser,
      status: "Active",
      createdAt: new Date().toISOString(),
      lastLogin: null,
      profileImage: null
    };
    
    setUsers([user, ...users]);
    setNewUser({ firstName: "", lastName: "", email: "", phone: "", password: "", role: "User" });
    setShowCreateModal(false);
  }

  function toggleUserStatus(id) {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === "Active" ? "Disabled" : "Active" } : u
    ));
  }

  function deleteUser(id) {
    if (window.confirm("Are you sure you want to permanently delete this user? This action cannot be undone.")) {
      setUsers(users.filter(u => u.id !== id));
    }
  }

  return (
    <div className="w-full flex flex-col gap-[20px] border border-light-border dark:border-dark-border p-[30px] rounded-[10px]">
      <div className="flex items-center justify-between">
        <p className="text-[18px] font-semibold">User Management</p>
        <button
          className="px-[14px] py-[8px] rounded-[8px] bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setShowCreateModal(true)}
        >
          Add New User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-[10px]">
        <input
          className="border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] w-[260px] dark:bg-transparent"
          placeholder="Search by name, email, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          {roles.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
        <select
          className="border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[1000px] w-full border border-light-border dark:border-dark-border text-left rounded-[10px] overflow-hidden">
          <thead className="bg-gray-50 dark:bg-zinc-900">
            <tr>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">S. No</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Name</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Email</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Phone</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Role</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Status</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Last Login</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, idx) => (
              <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900 transition">
                <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{idx + 1}</td>
                <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">
                  {u.firstName} {u.lastName}
                </td>
                <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{u.email}</td>
                <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{u.phone}</td>
                <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">
                  <RoleBadge role={u.role} />
                </td>
                <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">
                  <StatusBadge status={u.status} />
                </td>
                <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">
                  {u.lastLogin ? formatDate(u.lastLogin) : "Never"}
                </td>
                <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">
                  <div className="flex gap-[8px]">
                    <button
                      className="px-[8px] py-[4px] rounded-[6px] border border-light-border dark:border-dark-border text-[12px]"
                      onClick={() => navigate(`/admin/user_management/:${u.id}`, { state: { user: u } })}
                    >
                      View
                    </button>
                    <button
                      className={`px-[8px] py-[4px] rounded-[6px] text-[12px] ${
                        u.status === "Active"
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                      onClick={() => toggleUserStatus(u.id)}
                    >
                      {u.status === "Active" ? "Disable" : "Enable"}
                    </button>
                    <button
                      className="px-[8px] py-[4px] rounded-[6px] bg-red-600 text-white hover:bg-red-700 text-[12px]"
                      onClick={() => deleteUser(u.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-[14px] text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 p-[30px] rounded-[10px] w-[500px] max-w-[90vw]">
            <div className="flex justify-between items-center mb-[20px]">
              <h3 className="text-[18px] font-semibold">Create New User</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowCreateModal(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={createUser} className="flex flex-col gap-[15px]">
              <div className="grid grid-cols-2 gap-[10px]">
                <input
                  className="border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                  placeholder="First Name"
                  value={newUser.firstName}
                  onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                  required
                />
                <input
                  className="border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                  placeholder="Last Name"
                  value={newUser.lastName}
                  onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                  required
                />
              </div>
              
              <input
                className="border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                placeholder="Email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                required
              />
              
              <input
                className="border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                placeholder="Phone"
                value={newUser.phone}
                onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                required
              />
              
              <input
                className="border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                placeholder="Password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                required
              />
              
              <select
                className="border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              >
                <option value="User">User</option>
                <option value="Creator">Creator</option>
                <option value="Reviewer">Reviewer</option>
                <option value="Admin">Admin</option>
              </select>
              
              <div className="flex gap-[10px] justify-end">
                <button
                  type="button"
                  className="px-[14px] py-[8px] rounded-[8px] border border-light-border dark:border-dark-border"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-[14px] py-[8px] rounded-[8px] bg-blue-600 text-white hover:bg-blue-700"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}