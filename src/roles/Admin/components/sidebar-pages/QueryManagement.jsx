import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialQueries = [
  {
    id: 1,
    username: "anita.s",
    subject: "Mathematics",
    query: "How to evaluate lim x->0 (sin x)/x?",
    status: "Active",
    urgent: true,
    updatedAt: new Date().toISOString(),
    answer: ""
  },
  {
    id: 2,
    username: "rahul.k",
    subject: "Physics",
    query: "Difference between mass and weight?",
    status: "Resolved",
    urgent: false,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    answer: "Mass is invariant; weight depends on gravity."
  },
  {
    id: 3,
    username: "meera.v",
    subject: "Chemistry",
    query: "How to convert grams to moles?",
    status: "Active",
    urgent: false,
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    answer: ""
  }
];

const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"];
const statuses = ["Active", "Closed", "Urgent", "Resolved"];

function formatDate(dt) {
  try {
    const d = new Date(dt);
    return d.toLocaleString();
  } catch {
    return dt;
  }
}

//color-coded-badge
function StatusBadge({ status, urgent}) {
  const base = "text-[12px] px-[8px] py-[2px] rounded-[6px] border border-light-border dark:border-dark-border";
  const map = {
    Active: `${base} border-blue-300 text-blue-700 bg-blue-50 dark:bg-blue-950/30`,
    Closed: `${base} border-gray-300 text-gray-700 bg-gray-50 dark:bg-gray-950/30`,
    Resolved: `${base} border-green-300 text-green-700 bg-green-50 dark:bg-green-950/30`,
    Urgent: `${base} border-red-300 text-red-700 bg-red-50 dark:bg-red-950/30`,
  };

  const key = urgent ? "Urgent" : (map[status] ? status : "Active");
  return <span className={map[key]}>{urgent ? "Urgent" : status}</span>;
}

export default function QueryManagement() {
  const navigate = useNavigate();

  const [queries, setQueries] = useState(initialQueries);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [onlyUrgent, setOnlyUrgent] = useState(false);

  const filtered = useMemo(() => {
    return queries.filter((q) => {
      const matchSearch =
        !search ||
        q.username.toLowerCase().includes(search.toLowerCase()) ||
        q.query.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" ? true : q.status === statusFilter;
      const matchSubject = subjectFilter === "All" ? true : q.subject === subjectFilter;
      const matchUrgent = onlyUrgent ? q.urgent : true;
      return matchSearch && matchStatus && matchSubject && matchUrgent;
    });
  }, [queries, search, statusFilter, subjectFilter, onlyUrgent]);

  return (
    <div className="w-full flex flex-col gap-[20px] border border-light-border dark:border-dark-border p-[30px] rounded-[10px]">
      <div className="flex items-center justify-between">
        <p className="text-[18px] font-semibold">Query Management</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-[10px]">
        <input
          className="border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] w-[260px] dark:bg-transparent"
          placeholder="Search by username or query..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          className="border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
        >
          <option>All</option>
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <label className="flex items-center gap-[8px] text-[14px]">
          <input type="checkbox" checked={onlyUrgent} onChange={(e) => setOnlyUrgent(e.target.checked)} />
          Show Urgent Only
        </label>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[900px] w-full border border-light-border dark:border-dark-border text-left rounded-[10px] overflow-hidden">
          <thead className="bg-gray-50 dark:bg-zinc-900">
            <tr>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">S. No</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Username</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Subject</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Query</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Status</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Last Update</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((q, idx) => (
              <tr key={q.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900 transition">
                <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{idx + 1}</td>
                <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{q.username}</td>
                <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{q.subject}</td>
                <td className="px-4 py-3 border-b border-light-border dark:border-dark-border max-w-[360px] truncate">{q.query}</td>
                <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">
                  <StatusBadge status={q.status} urgent={q.urgent} />
                </td>
                <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{formatDate(q.updatedAt)}</td>
                <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">
                  <button
                    className="px-[10px] py-[6px] rounded-[8px] border border-light-border dark:border-dark-border"
                    onClick={() => navigate(`/admin/query_management/:${q.id}`, { state: { row: q } })}
                  >
                    View / Reply
                  </button>
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-[14px] text-gray-500">
                  No queries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}