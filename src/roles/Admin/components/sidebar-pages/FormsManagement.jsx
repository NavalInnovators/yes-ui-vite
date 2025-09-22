import { useMemo, useState } from "react";

const initialForms = [
  {
    id: 101,
    source: "Contact", // Contact | FAQ
    firstName: "Anita",
    lastName: "Sharma",
    phone: "+91-9000000001",
    email: "anita@example.com",
    subject: "Course recommendation",
    message: "Which course is best for NEET prep?",
    status: "New", // New | Answered | Closed | Urgent
    urgent: false,
    updatedAt: new Date().toISOString(),
    reply: ""
  },
  {
    id: 102,
    source: "FAQ",
    firstName: "Rahul",
    lastName: "K",
    phone: "+91-9000000002",
    email: "rahul@example.com",
    subject: "Refund policy",
    message: "How do refunds work?",
    status: "Answered",
    urgent: true,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    reply: "Refunds are processed in 5-7 business days."
  }
];

const sources = ["All", "Contact", "FAQ"];
const statuses = ["All", "New", "Answered", "Closed", "Urgent"];

function formatDate(dt) {
  try {
    return new Date(dt).toLocaleString();
  } catch {
    return dt;
  }
}

function StatusBadge({ status, urgent }) {
  const base = "text-[12px] px-[8px] py-[2px] rounded-[6px] border";
  const map = {
    New: `${base} border-blue-300 text-blue-700 bg-blue-50 dark:bg-blue-950/30`,
    Answered: `${base} border-green-300 text-green-700 bg-green-50 dark:bg-green-950/30`,
    Closed: `${base} border-gray-300 text-gray-700 bg-gray-50 dark:bg-zinc-900`,
    Urgent: `${base} border-red-400 text-red-700 bg-red-50 dark:bg-red-950/30`,
  };
  const key = urgent ? "Urgent" : (map[status] ? status : "New");
  return <span className={map[key]}>{urgent ? "Urgent" : status}</span>;
}

export default function FormsManagement() {
  const [rows, setRows] = useState(initialForms);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [onlyUrgent, setOnlyUrgent] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [draftReply, setDraftReply] = useState("");

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const hay = `${r.firstName} ${r.lastName} ${r.email} ${r.phone} ${r.subject} ${r.message}`.toLowerCase();
      const matchSearch = !search || hay.includes(search.toLowerCase());
      const matchSource = sourceFilter === "All" ? true : r.source === sourceFilter;
      const matchStatus = statusFilter === "All" ? true : r.status === statusFilter;
      const matchUrgent = onlyUrgent ? r.urgent : true;
      return matchSearch && matchSource && matchStatus && matchUrgent;
    });
  }, [rows, search, sourceFilter, statusFilter, onlyUrgent]);

  function toggleExpand(row) {
    if (expandedId === row.id) {
      setExpandedId(null);
      setDraftReply("");
    } else {
      setExpandedId(row.id);
      setDraftReply(row.reply || "");
    }
  }

  function updateRow(id, updater) {
    setRows((rs) =>
      rs.map((r) =>
        r.id === id ? { ...r, ...updater, updatedAt: new Date().toISOString() } : r
      )
    );
  }

  function saveReply(id) {
    // Single reply allowed: saving sets status to Answered if there is content.
    const nextStatus = draftReply.trim() ? "Answered" : "New";
    updateRow(id, { reply: draftReply.trim(), status: nextStatus });
  }

  function markClosed(id) {
    updateRow(id, { status: "Closed" });
  }

  function toggleUrgent(id, val) {
    updateRow(id, { urgent: val, status: val ? "Urgent" : "New" });
  }

  return (
    <div className="w-full flex flex-col gap-[20px] border border-light-border dark:border-dark-border p-[30px] rounded-[10px]">
      <div className="flex items-center justify-between">
        <p className="text-[18px] font-semibold">Forms Management</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-[10px]">
        <input
          className="border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] w-[260px] dark:bg-transparent"
          placeholder="Search name, email, subject, message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
        >
          {sources.map((s) => (
            <option key={s}>{s}</option>
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
        <label className="flex items-center gap-[8px] text-[14px]">
          <input
            type="checkbox"
            checked={onlyUrgent}
            onChange={(e) => setOnlyUrgent(e.target.checked)}
          />
          Show Urgent Only
        </label>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[1000px] w-full border border-light-border dark:border-dark-border text-left rounded-[10px] overflow-hidden">
          <thead className="bg-gray-50 dark:bg-zinc-900">
            <tr>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">S. No</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Source</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Name</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Email</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Phone</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Subject</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Status</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Last Update</th>
              <th className="px-4 py-3 border-b border-light-border dark:border-dark-border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, idx) => (
              <>
                <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900 transition">
                  <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{idx + 1}</td>
                  <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{r.source}</td>
                  <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">
                    {r.firstName} {r.lastName}
                  </td>
                  <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{r.email}</td>
                  <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">{r.phone}</td>
                  <td className="px-4 py-3 border-b border-light-border dark:border-dark-border max-w-[360px] truncate">
                    {r.subject}
                  </td>
                  <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">
                    <StatusBadge status={r.status} urgent={r.urgent} />
                  </td>
                  <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">
                    {formatDate(r.updatedAt)}
                  </td>
                  <td className="px-4 py-3 border-b border-light-border dark:border-dark-border">
                    <button
                      className="px-[10px] py-[6px] rounded-[8px] border border-light-border dark:border-dark-border"
                      onClick={() => toggleExpand(r)}
                    >
                      {expandedId === r.id ? "Hide" : "View / Reply"}
                    </button>
                  </td>
                </tr>

                {expandedId === r.id && (
                  <tr>
                    <td colSpan={9} className="px-4 py-4 border-b border-light-border dark:border-dark-border">
                      <div className="flex flex-col gap-[10px]">
                        <div className="text-[14px]">
                          <span className="font-medium">Message:</span> {r.message}
                        </div>
                        <textarea
                          className="border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] min-h-[80px] dark:bg-transparent"
                          placeholder="Write a single reply to this query..."
                          value={draftReply}
                          onChange={(e) => setDraftReply(e.target.value)}
                          disabled={r.reply && r.reply.length > 0}
                        />
                        <div className="flex flex-wrap gap-[8px]">
                          <button
                            className="px-[12px] py-[8px] rounded-[8px] bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                            onClick={() => saveReply(r.id)}
                            disabled={r.reply && r.reply.length > 0}
                          >
                            Save Reply
                          </button>
                          <button
                            className="px-[12px] py-[8px] rounded-[8px] bg-gray-600 text-white hover:bg-gray-700"
                            onClick={() => markClosed(r.id)}
                          >
                            Mark Closed
                          </button>
                          <label className="flex items-center gap-[6px] text-[14px] ml-auto">
                            <input
                              type="checkbox"
                              checked={r.urgent}
                              onChange={(e) => toggleUrgent(r.id, e.target.checked)}
                            />
                            Mark as Urgent
                          </label>
                        </div>
                        {r.reply && (
                          <div className="text-[14px] border-t border-light-border dark:border-dark-border pt-[8px]">
                            <span className="font-medium">Admin reply:</span> {r.reply}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
            {!filtered.length && (
              <tr>
                <td colSpan={9} className="px-4 py-6 text-center text-[14px] text-gray-500">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}