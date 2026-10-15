
import { useCallback, useEffect, useState } from "react";
import { MessageCircle, Plus, Send, Users, RefreshCw } from "lucide-react";

const API_URL = "https://impanolink.onrender.com";

export default function GroupChat() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const token = sessionStorage.getItem("impanolink_token");

  const request = useCallback(async (path, options = {}) => {
    if (!token) throw new Error("Banza winjire muri konti yawe.");

    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Habaye ikibazo. Ongera ugerageze.");
    }

    return data;
  }, [token]);

  const loadGroups = useCallback(async () => {
    try {
      setError("");
      const data = await request("/api/chat/groups");
      setGroups(data.groups || []);
      setSelectedGroup((current) => {
        if (!current) return null;
        return (data.groups || []).find(
          (group) => String(group.id) === String(current.id)
        ) || null;
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [request]);

  const loadMessages = useCallback(async (groupId, silent = false) => {
    try {
      if (!silent) setError("");
      const data = await request(
        `/api/chat/groups/${groupId}/messages`
      );
      setMessages(data.messages || []);
    } catch (err) {
      if (!silent) setError(err.message);
    }
  }, [request]);

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  useEffect(() => {
    if (!selectedGroup) {
      setMessages([]);
      return;
    }

    const groupId = selectedGroup.id;
    loadMessages(groupId);

    const interval = setInterval(() => {
      loadMessages(groupId, true);
    }, 4000);

    return () => clearInterval(interval);
  }, [selectedGroup, loadMessages]);

  async function createGroup(event) {
    event.preventDefault();
    if (!groupName.trim()) return;

    try {
      setError("");
      setNotice("");
      const data = await request("/api/chat/groups", {
        method: "POST",
        body: JSON.stringify({ name: groupName.trim() }),
      });

      setGroupName("");
      setNotice("Itsinda ryakozwe neza!");
      await loadGroups();
      setSelectedGroup(data.group);
    } catch (err) {
      setError(err.message);
    }
  }

  async function sendMessage(event) {
    event.preventDefault();
    if (!message.trim() || !selectedGroup || sending) return;

    try {
      setSending(true);
      setError("");

      const data = await request(
        `/api/chat/groups/${selectedGroup.id}/messages`,
        {
          method: "POST",
          body: JSON.stringify({ message: message.trim() }),
        }
      );

      setMessages((current) => {
        if (current.some((item) => item.id === data.data.id)) {
          return current;
        }
        return [...current, data.data];
      });

      setMessage("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#101c35] px-4 py-8 text-slate-100 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-7">
          <div className="mb-2 flex items-center gap-3">
            <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
              <MessageCircle size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Group Chat</h1>
              <p className="text-sm text-slate-400">
           Chat with other ImpanoLink users.
              </p>
            </div>
          </div>
        </header>

        {error && (
          <div role="alert" className="mb-4 rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-red-200">
            {error}
          </div>
        )}

        {notice && (
          <div className="mb-4 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-3 text-emerald-200">
            {notice}
          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
          <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Users size={20} className="text-cyan-300" />
            My Groups
            </h2>

            <form onSubmit={createGroup} className="mb-5 flex gap-2">
              <input
                value={groupName}
                onChange={(event) => setGroupName(event.target.value)}
                placeholder="Izina ry'itsinda..."
                maxLength={100}
                className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#0b1428] px-3 py-2 text-sm outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                title="Kora itsinda"
                className="rounded-lg bg-cyan-400 px-3 text-slate-950 hover:bg-cyan-300"
              >
                <Plus size={20} />
              </button>
            </form>

            <button
              type="button"
              onClick={loadGroups}
              className="mb-3 flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300"
            >
              <RefreshCw size={15} />Refresh Groups
            </button>

            {loading ? (
              <p className="text-sm text-slate-400">Loading...</p>
            ) : groups.length === 0 ? (
              <p className="text-sm text-slate-400">
            You're not in any groups yet. Create your first group using the box above
              </p>
            ) : (
              <div className="space-y-2">
                {groups.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => {
                      setSelectedGroup(group);
                      setNotice("");
                    }}
                    className={`w-full rounded-xl border p-3 text-left transition ${
                      String(selectedGroup?.id) === String(group.id)
                        ? "border-cyan-400/50 bg-cyan-400/10"
                        : "border-white/10 bg-[#0b1428] hover:border-white/20"
                    }`}
                  >
                    <span className="block font-medium">{group.name}</span>
                    <span className="mt-1 block text-xs text-slate-400">
                      {group.member_count} abanyamuryango
                    </span>
                  </button>
                ))}
              </div>
            )}
          </aside>

          <section className="flex min-h-[560px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
            {selectedGroup ? (
              <>
                <div className="border-b border-white/10 px-5 py-4">
                  <h2 className="text-xl font-semibold">{selectedGroup.name}</h2>
                  <p className="text-sm text-slate-400">
                 New messages are checked every 4 seconds.
                  </p>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto p-5">
                  {messages.length === 0 ? (
                    <div className="py-12 text-center text-slate-400">
                      <MessageCircle className="mx-auto mb-3" size={32} />
                   No messages yet. Start a conversation!
                    </div>
                  ) : (
                    messages.map((item) => (
                      <article
                        key={item.id}
                        className="rounded-xl border border-white/10 bg-[#0b1428] p-3"
                      >
                        <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-cyan-300">
                            {item.sender_name || "Umukoresha"}
                          </span>
                          <time className="text-xs text-slate-500">
                            {new Date(item.created_at).toLocaleString()}
                          </time>
                        </div>
                        <p className="whitespace-pre-wrap break-words text-sm leading-6">
                          {item.message}
                        </p>
                      </article>
                    ))
                  )}
                </div>

                <form
                  onSubmit={sendMessage}
                  className="flex gap-3 border-t border-white/10 p-4"
                >
                  <input
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Andika ubutumwa..."
                    maxLength={5000}
                    className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0b1428] px-4 py-3 outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    disabled={sending || !message.trim()}
                    className="flex items-center gap-2 rounded-xl bg-cyan-400 px-4 font-semibold text-slate-950 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Send size={18} />
                    <span className="hidden sm:inline">
                      {sending ? "Birimo kohereza..." : "Ohereza"}
                    </span>
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <MessageCircle size={48} className="mb-4 text-cyan-300" />
                <h2 className="mb-2 text-xl font-semibold">
                Welcome to Group Chat
                </h2>
                <p className="max-w-sm text-sm text-slate-400">
             Select a group on the left or create a new one to start chatting.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
