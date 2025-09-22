import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";

function formatDate(dt) {
  try {
    return new Date(dt).toLocaleString();
  } catch {
    return dt;
  }
}

export default function QueryThread() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const row = location.state?.row;

  // Fallback stub if user navigated directly
  const fallback = useMemo(
    () => ({
      id: Number(id),
      username: "user_" + id,
      subject: "General",
      query: "Query details are not available from the list view. This is a placeholder.",
      status: "Active",
      urgent: false,
      updatedAt: new Date().toISOString(),
      answer: ""
    }),
    [id]
  );

  const base = row || fallback;

  // Simple in-memory thread. Seed with the original question and any prior answer.
  const [messages, setMessages] = useState(() => {
    const seed = [{ by: base.username, text: base.query, at: base.updatedAt }];
    if (base.answer) seed.push({ by: "admin", text: base.answer, at: new Date().toISOString() });
    return seed;
  });
  const [status, setStatus] = useState(base.status);
  const [urgent, setUrgent] = useState(base.urgent);
  const [reply, setReply] = useState("");

  function sendReply() {
    if (!reply.trim()) return;
    setMessages((m) => [...m, { by: "admin", text: reply.trim(), at: new Date().toISOString() }]);
    setReply("");
    setStatus((s) => (s === "Resolved" || s === "Closed" ? s : urgent ? "Urgent" : "Active"));
  }

  function markResolved() {
    setStatus("Resolved");
  }
  function markClosed() {
    setStatus("Closed");
  }

  return (
    <div className="w-full h-full flex flex-col gap-[14px] border border-light-border dark:border-dark-border p-[20px] rounded-[10px]">
      {/* Header */}
      <div className="flex items-start justify-between gap-[12px] flex-wrap">
        <div className="flex flex-col">
          <div className="flex items-center gap-[10px]">
            <button
              className="px-[10px] py-[6px] rounded-[8px] border border-light-border dark:border-dark-border"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <p className="text-[18px] font-semibold">Query #{base.id}</p>
          </div>
          <div className="text-[14px] text-gray-600 dark:text-gray-300 mt-[6px]">
            <span className="mr-[10px]">User: {base.username}</span>
            <span className="mr-[10px]">Subject: {base.subject}</span>
            <span className="mr-[10px]">Last Update: {formatDate(messages[messages.length - 1]?.at)}</span>
          </div>
        </div>

        <div className="flex items-center gap-[8px]">
          <span className="text-[12px] px-[8px] py-[2px] rounded-[6px] border border-light-border dark:border-dark-border">
            {status}
          </span>
          <label className="flex items-center gap-[6px] text-[14px]">
            <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} />
            Mark as Urgent
          </label>
          <button
            className="px-[12px] py-[8px] rounded-[8px] bg-green-600 text-white hover:bg-green-700"
            onClick={markResolved}
          >
            Mark Resolved
          </button>
          <button
            className="px-[12px] py-[8px] rounded-[8px] bg-gray-600 text-white hover:bg-gray-700"
            onClick={markClosed}
          >
            Mark Closed
          </button>
        </div>
      </div>

      {/* Thread */}
      <div className="flex-1 min-h-[300px] max-h-[calc(100vh-64px-63px-220px)] overflow-y-auto custom-scrollbar rounded-[10px] border border-light-border dark:border-dark-border p-[14px]">
        <div className="flex flex-col gap-[10px]">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[80%] px-[12px] py-[8px] rounded-[10px] ${
                m.by === "admin"
                  ? "ml-auto bg-blue-600 text-white"
                  : "mr-auto border border-light-border dark:border-dark-border"
              }`}
              title={formatDate(m.at)}
            >
              <div className="text-[12px] opacity-80 mb-[4px]">{m.by === "admin" ? "Admin" : m.by}</div>
              <div className="whitespace-pre-wrap">{m.text}</div>
            </div>
          ))}
          {!messages.length && <div className="text-[14px] text-gray-500">No messages yet.</div>}
        </div>
      </div>

      {/* Composer */}
      <div className="flex items-end gap-[10px]">
        <textarea
          className="flex-1 min-h-[60px] border border-light-border dark:border-dark-border rounded-[8px] px-[12px] py-[8px] dark:bg-transparent"
          placeholder="Type your reply..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        <button
          className="px-[14px] py-[10px] rounded-[8px] bg-blue-600 text-white hover:bg-blue-700"
          onClick={sendReply}
        >
          Send
        </button>
      </div>
    </div>
  );
}