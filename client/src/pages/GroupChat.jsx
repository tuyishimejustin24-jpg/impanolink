
// import { useCallback, useEffect, useState } from "react";
// import { MessageCircle, Plus, Send, Users, RefreshCw } from "lucide-react";

// const API_URL = "https://impanolink.onrender.com";

// export default function GroupChat() {
//   const [groups, setGroups] = useState([]);
//   const [selectedGroup, setSelectedGroup] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [groupName, setGroupName] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [sending, setSending] = useState(false);
//   const [error, setError] = useState("");
//   const [notice, setNotice] = useState("");

//   const token = sessionStorage.getItem("impanolink_token");

//   const request = useCallback(async (path, options = {}) => {
//     if (!token) throw new Error("Banza winjire muri konti yawe.");

//     const response = await fetch(`${API_URL}${path}`, {
//       ...options,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//         ...options.headers,
//       },
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.error || "Habaye ikibazo. Ongera ugerageze.");
//     }

//     return data;
//   }, [token]);

//   const loadGroups = useCallback(async () => {
//     try {
//       setError("");
//       const data = await request("/api/chat/groups");
//       setGroups(data.groups || []);
//       setSelectedGroup((current) => {
//         if (!current) return null;
//         return (data.groups || []).find(
//           (group) => String(group.id) === String(current.id)
//         ) || null;
//       });
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [request]);

//   const loadMessages = useCallback(async (groupId, silent = false) => {
//     try {
//       if (!silent) setError("");
//       const data = await request(
//         `/api/chat/groups/${groupId}/messages`
//       );
//       setMessages(data.messages || []);
//     } catch (err) {
//       if (!silent) setError(err.message);
//     }
//   }, [request]);

//   useEffect(() => {
//     loadGroups();
//   }, [loadGroups]);

//   useEffect(() => {
//     if (!selectedGroup) {
//       setMessages([]);
//       return;
//     }

//     const groupId = selectedGroup.id;
//     loadMessages(groupId);

//     const interval = setInterval(() => {
//       loadMessages(groupId, true);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [selectedGroup, loadMessages]);

//   async function createGroup(event) {
//     event.preventDefault();
//     if (!groupName.trim()) return;

//     try {
//       setError("");
//       setNotice("");
//       const data = await request("/api/chat/groups", {
//         method: "POST",
//         body: JSON.stringify({ name: groupName.trim() }),
//       });

//       setGroupName("");
//       setNotice("Itsinda ryakozwe neza!");
//       await loadGroups();
//       setSelectedGroup(data.group);
//     } catch (err) {
//       setError(err.message);
//     }
//   }

//   async function sendMessage(event) {
//     event.preventDefault();
//     if (!message.trim() || !selectedGroup || sending) return;

//     try {
//       setSending(true);
//       setError("");

//       const data = await request(
//         `/api/chat/groups/${selectedGroup.id}/messages`,
//         {
//           method: "POST",
//           body: JSON.stringify({ message: message.trim() }),
//         }
//       );

//       setMessages((current) => {
//         if (current.some((item) => item.id === data.data.id)) {
//           return current;
//         }
//         return [...current, data.data];
//       });

//       setMessage("");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSending(false);
//     }
//   }

//   return (
//     <main className="min-h-screen bg-[#101c35] px-4 py-8 text-slate-100 sm:px-6">
//       <div className="mx-auto max-w-6xl">
//         <header className="mb-7">
//           <div className="mb-2 flex items-center gap-3">
//             <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
//               <MessageCircle size={28} />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold">Group Chat</h1>
//               <p className="text-sm text-slate-400">
//            Chat with other ImpanoLink users.
//               </p>
//             </div>
//           </div>
//         </header>

//         {error && (
//           <div role="alert" className="mb-4 rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-red-200">
//             {error}
//           </div>
//         )}

//         {notice && (
//           <div className="mb-4 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-3 text-emerald-200">
//             {notice}
//           </div>
//         )}

//         <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
//           <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
//             <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
//               <Users size={20} className="text-cyan-300" />
//             My Groups
//             </h2>

//             <form onSubmit={createGroup} className="mb-5 flex gap-2">
//               <input
//                 value={groupName}
//                 onChange={(event) => setGroupName(event.target.value)}
//                 placeholder="Izina ry'itsinda..."
//                 maxLength={100}
//                 className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#0b1428] px-3 py-2 text-sm outline-none focus:border-cyan-400"
//               />
//               <button
//                 type="submit"
//                 title="Kora itsinda"
//                 className="rounded-lg bg-cyan-400 px-3 text-slate-950 hover:bg-cyan-300"
//               >
//                 <Plus size={20} />
//               </button>
//             </form>

//             <button
//               type="button"
//               onClick={loadGroups}
//               className="mb-3 flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300"
//             >
//               <RefreshCw size={15} />Refresh Groups
//             </button>

//             {loading ? (
//               <p className="text-sm text-slate-400">Loading...</p>
//             ) : groups.length === 0 ? (
//               <p className="text-sm text-slate-400">
//             You're not in any groups yet. Create your first group using the box above
//               </p>
//             ) : (
//               <div className="space-y-2">
//                 {groups.map((group) => (
//                   <button
//                     key={group.id}
//                     type="button"
//                     onClick={() => {
//                       setSelectedGroup(group);
//                       setNotice("");
//                     }}
//                     className={`w-full rounded-xl border p-3 text-left transition ${
//                       String(selectedGroup?.id) === String(group.id)
//                         ? "border-cyan-400/50 bg-cyan-400/10"
//                         : "border-white/10 bg-[#0b1428] hover:border-white/20"
//                     }`}
//                   >
//                     <span className="block font-medium">{group.name}</span>
//                     <span className="mt-1 block text-xs text-slate-400">
//                       {group.member_count} abanyamuryango
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             )}
//           </aside>

//           <section className="flex min-h-[560px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
//             {selectedGroup ? (
//               <>
//                 <div className="border-b border-white/10 px-5 py-4">
//                   <h2 className="text-xl font-semibold">{selectedGroup.name}</h2>
//                   <p className="text-sm text-slate-400">
//                  New messages are checked every 4 seconds.
//                   </p>
//                 </div>

//                 <div className="flex-1 space-y-4 overflow-y-auto p-5">
//                   {messages.length === 0 ? (
//                     <div className="py-12 text-center text-slate-400">
//                       <MessageCircle className="mx-auto mb-3" size={32} />
//                    No messages yet. Start a conversation!
//                     </div>
//                   ) : (
//                     messages.map((item) => (
//                       <article
//                         key={item.id}
//                         className="rounded-xl border border-white/10 bg-[#0b1428] p-3"
//                       >
//                         <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
//                           <span className="text-sm font-semibold text-cyan-300">
//                             {item.sender_name || "Umukoresha"}
//                           </span>
//                           <time className="text-xs text-slate-500">
//                             {new Date(item.created_at).toLocaleString()}
//                           </time>
//                         </div>
//                         <p className="whitespace-pre-wrap break-words text-sm leading-6">
//                           {item.message}
//                         </p>
//                       </article>
//                     ))
//                   )}
//                 </div>

//                 <form
//                   onSubmit={sendMessage}
//                   className="flex gap-3 border-t border-white/10 p-4"
//                 >
//                   <input
//                     value={message}
//                     onChange={(event) => setMessage(event.target.value)}
//                     placeholder="Andika ubutumwa..."
//                     maxLength={5000}
//                     className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0b1428] px-4 py-3 outline-none focus:border-cyan-400"
//                   />
//                   <button
//                     type="submit"
//                     disabled={sending || !message.trim()}
//                     className="flex items-center gap-2 rounded-xl bg-cyan-400 px-4 font-semibold text-slate-950 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
//                   >
//                     <Send size={18} />
//                     <span className="hidden sm:inline">
//                       {sending ? "Birimo kohereza..." : "Ohereza"}
//                     </span>
//                   </button>
//                 </form>
//               </>
//             ) : (
//               <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
//                 <MessageCircle size={48} className="mb-4 text-cyan-300" />
//                 <h2 className="mb-2 text-xl font-semibold">
//                 Welcome to Group Chat
//                 </h2>
//                 <p className="max-w-sm text-sm text-slate-400">
//              Select a group on the left or create a new one to start chatting.
//                 </p>
//               </div>
//             )}
//           </section>
//         </div>
//       </div>
//     </main>
//   );
// }

import { useEffect, useState } from "react";
import {
  MessageCircle,
  Plus,
  Send,
  Users,
  Settings,
  Circle,
  Paperclip,
  Image as ImageIcon,
  X,
  UserRound,
  Camera,
} from "lucide-react";

const CHAT_KEY = "impanolink_demo_chat";
const STATUS_KEY = "impanolink_demo_statuses";
const USER_KEY = "impanolink_demo_user";
const SETTINGS_KEY = "impanolink_chat_settings";

const everyoneGroup = {
  id: "everyone",
  name: "Everyone",
  member_count: 1,
};

const startingGroups = [
  everyoneGroup,
  { id: "group-1", name: "Talent Community", member_count: 12 },
  { id: "group-2", name: "Job Opportunities", member_count: 8 },
  { id: "group-3", name: "Creative Ideas", member_count: 6 },
];

function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function getCurrentUser() {
  const user =
    readJSON(USER_KEY, null) ||
    readJSON("impanolink_demo_user", null) ||
    {};

  const avatar =
    user.avatar ||
    user.profilePicture ||
    user.profile_picture ||
    user.photo ||
    user.image ||
    "";

  return {
    name:
      user.fullName ||
      user.full_name ||
      user.name ||
      "Demo User",
    email: user.email || "",
    avatar:
      typeof avatar === "string"
        ? avatar
        : avatar?.data || "",
  };
}

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "?";
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    if (file.size > 1024 * 1024) {
      reject(new Error(`${file.name} is larger than 1 MB.`));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve({
        id: `${Date.now()}-${file.name}`,
        name: file.name,
        type: file.type,
        data: reader.result,
      });
    };

    reader.onerror = () => {
      reject(new Error(`Could not read ${file.name}.`));
    };

    reader.readAsDataURL(file);
  });
}

function loadChat() {
  const saved = readJSON(CHAT_KEY, null);

  if (saved && Array.isArray(saved.groups) && saved.messages) {
    const groups = saved.groups.some(
      (group) => group.id === "everyone"
    )
      ? saved.groups
      : [everyoneGroup, ...saved.groups];

    return {
      groups,
      messages: {
        everyone: [],
        ...saved.messages,
      },
    };
  }

  return {
    groups: startingGroups,
    messages: {
      everyone: [],
      "group-1": [
        {
          id: "welcome-1",
          sender_name: "ImpanoLink",
          message:
            "Welcome to the Talent Community! Introduce yourself and share your skills.",
          created_at: new Date().toISOString(),
          files: [],
        },
      ],
      "group-2": [
        {
          id: "welcome-2",
          sender_name: "ImpanoLink",
          message:
            "Share job opportunities and connect with employers.",
          created_at: new Date().toISOString(),
          files: [],
        },
      ],
      "group-3": [],
    },
  };
}

function Avatar({ name, src, size = "h-9 w-9" }) {
  return (
    <div
      className={`${size} flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-cyan-700 text-xs font-bold text-white`}
    >
      {src ? (
        <img
          src={src}
          alt={`${name} profile`}
          className="h-full w-full object-cover"
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}

export default function GroupChat() {
  const [chatData, setChatData] = useState(loadChat);
  const [currentUser, setCurrentUser] = useState(getCurrentUser);

  const [selectedGroupId, setSelectedGroupId] =
    useState("everyone");
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [showGroupForm, setShowGroupForm] = useState(false);

  const [statuses, setStatuses] = useState(() =>
    readJSON(STATUS_KEY, [])
  );
  const [showStatusForm, setShowStatusForm] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [statusImage, setStatusImage] = useState(null);
  const [viewingStatus, setViewingStatus] = useState(null);

  const [showSettings, setShowSettings] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] =
    useState(
      () =>
        readJSON(SETTINGS_KEY, { notifications: true })
          .notifications
    );

  const [online, setOnline] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const groups = chatData.groups;

  const selectedGroup =
    groups.find((group) => group.id === selectedGroupId) ||
    groups[0];

  const messages = selectedGroup
    ? chatData.messages[selectedGroup.id] || []
    : [];

  useEffect(() => {
    try {
      localStorage.setItem(CHAT_KEY, JSON.stringify(chatData));
    } catch {
      setError(
        "Storage is full. Try removing large attachments."
      );
    }
  }, [chatData]);

  useEffect(() => {
    try {
      localStorage.setItem(STATUS_KEY, JSON.stringify(statuses));
    } catch {
      setError("Could not save status. Try a smaller image.");
    }
  }, [statuses]);

  useEffect(() => {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify({
        notifications: notificationsEnabled,
      })
    );
  }, [notificationsEnabled]);

  function chooseGroup(groupId) {
    setSelectedGroupId(groupId);
    setError("");
    setNotice("");
  }

  async function handleProfileImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image for your profile.");
      event.target.value = "";
      return;
    }

    try {
      const image = await readFile(file);

      const updatedUser = {
        ...currentUser,
        avatar: image.data,
      };

      setCurrentUser(updatedUser);

      // Save the photo in the current browser.
      const storedUser =
        readJSON(USER_KEY, null) ||
        readJSON("impanolink_demo_user", {});

      localStorage.setItem(
        USER_KEY,
        JSON.stringify({
          ...storedUser,
          fullName:
            storedUser.fullName ||
            storedUser.full_name ||
            storedUser.name ||
            currentUser.name,
          email: storedUser.email || currentUser.email,
          avatar: image.data,
        })
      );

      setError("");
      setNotice("Your profile picture has been saved.");

    } catch (err) {
      setError(err.message || "Could not save profile picture.");
    }

    event.target.value = "";
  }

  async function handleStatusImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image for your status.");
      event.target.value = "";
      return;
    }

    try {
      const image = await readFile(file);
      setStatusImage(image);
      setError("");
    } catch (err) {
      setError(err.message);
    }

    event.target.value = "";
  }

  function saveStatus(event) {
    event.preventDefault();

    if (!statusText.trim() && !statusImage) {
      setError("Add text or choose a photo for your status.");
      return;
    }

    const newStatus = {
      id: `status-${Date.now()}`,
      user_name: currentUser.name,
      user_avatar: currentUser.avatar,
      text: statusText.trim(),
      image: statusImage,
      created_at: new Date().toISOString(),
    };

    setStatuses((current) => [newStatus, ...current]);
    setStatusText("");
    setStatusImage(null);
    setShowStatusForm(false);
    setError("");
    setNotice("Your status has been saved.");
  }

  async function handleMessageFiles(event) {
    const files = Array.from(event.target.files || []);

    try {
      const uploaded = await Promise.all(files.map(readFile));

      setSelectedFiles((current) => [
        ...current,
        ...uploaded,
      ]);

      setError("");
    } catch (err) {
      setError(err.message);
    }

    event.target.value = "";
  }

  function removeSelectedFile(fileId) {
    setSelectedFiles((current) =>
      current.filter((file) => file.id !== fileId)
    );
  }

  function sendMessage(event) {
    event.preventDefault();

    if (!message.trim() && selectedFiles.length === 0) {
      setError("Write a message or attach a file first.");
      return;
    }

    if (!selectedGroup) return;

    const newMessage = {
      id: `message-${Date.now()}`,
      sender_name: currentUser.name,
      sender_avatar: currentUser.avatar,
      message: message.trim(),
      created_at: new Date().toISOString(),
      files: selectedFiles,
    };

    setChatData((current) => ({
      ...current,
      messages: {
        ...current.messages,
        [selectedGroup.id]: [
          ...(current.messages[selectedGroup.id] || []),
          newMessage,
        ],
      },
    }));

    setMessage("");
    setSelectedFiles([]);
    setError("");
    setNotice("");
  }

  function createGroup(event) {
    event.preventDefault();

    const name = newGroupName.trim();

    if (!name) {
      setError("Enter a group name.");
      return;
    }

    if (
      groups.some(
        (group) =>
          group.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      setError("A group with this name already exists.");
      return;
    }

    const group = {
      id: `group-${Date.now()}`,
      name,
      member_count: 1,
    };

    setChatData((current) => ({
      groups: [...current.groups, group],
      messages: {
        ...current.messages,
        [group.id]: [],
      },
    }));

    setSelectedGroupId(group.id);
    setNewGroupName("");
    setShowGroupForm(false);
    setError("");
    setNotice("Demo group created.");
  }

  async function enableBrowserNotifications() {
    if (!("Notification" in window)) {
      setError("This browser does not support notifications.");
      return;
    }

    const permission =
      await Notification.requestPermission();

    if (permission === "granted") {
      setNotificationsEnabled(true);
      setNotice("Browser notifications are enabled.");
      setError("");
    } else {
      setNotificationsEnabled(false);
      setError("Notification permission was not granted.");
    }
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden px-3 py-5 text-slate-100 sm:px-6"
      style={{
        backgroundColor: "#061225",
        backgroundImage: `
          radial-gradient(circle at 15% 20%, rgba(34,211,238,0.15) 0 2px, transparent 3px),
          radial-gradient(circle at 75% 35%, rgba(96,165,250,0.18) 0 2px, transparent 3px),
          radial-gradient(circle at 45% 75%, rgba(34,211,238,0.12) 0 2px, transparent 3px),
          radial-gradient(circle at 85% 85%, rgba(96,165,250,0.16) 0 2px, transparent 3px),
          linear-gradient(135deg, #061225, #0b1d38 55%, #07172b)
        `,
        backgroundSize:
          "140px 140px, 190px 190px, 170px 170px, 220px 220px, cover",
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              ImpanoLink Community
            </p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              Groups & Chat
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Connect, share your skills, and discover opportunities.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              aria-label="Open settings"
              className="rounded-xl border border-slate-700 p-3 hover:bg-slate-800"
            >
              <Settings size={20} />
            </button>

            <div className="flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-2">
              <label
                className="group relative cursor-pointer"
                title="Change profile picture"
              >
                <Avatar
                  name={currentUser.name}
                  src={currentUser.avatar}
                  size="h-10 w-10"
                />
                <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition group-hover:opacity-100">
                  <Camera size={17} />
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImage}
                  className="hidden"
                />
              </label>

              <div>
                <p className="max-w-32 truncate text-sm font-semibold">
                  {currentUser.name}
                </p>
                <p className="flex items-center gap-1 text-xs text-slate-400">
                  <Circle
                    size={8}
                    fill={online ? "#22c55e" : "#8b6474"}
                    className="text-transparent"
                  />
                  {online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {error && (
          <div
            role="alert"
            className="mb-4 flex items-center justify-between rounded-xl border border-red-800 bg-red-950/50 p-3 text-sm text-red-200"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Dismiss error"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {notice && (
          <div className="mb-4 rounded-xl border border-emerald-800 bg-emerald-950/40 p-3 text-sm text-emerald-200">
            {notice}
          </div>
        )}

        {/* STATUS ROW */}
        <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-bold">Stories & Status</h2>
              <p className="text-xs text-slate-400">
                Share a moment with the community.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowStatusForm(true);
                setError("");
                setNotice("");
              }}
              className="flex items-center gap-2 rounded-xl bg-cyan-600 px-3 py-2 text-sm font-semibold hover:bg-cyan-500"
            >
              <Plus size={17} />
              Add Status
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            <button
              type="button"
              onClick={() => setShowStatusForm(true)}
              className="flex w-20 shrink-0 flex-col items-center gap-2"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-cyan-400 bg-slate-800 text-cyan-300">
                <Plus size={26} />
              </span>
              <span className="max-w-20 truncate text-xs">
                Your Status
              </span>
            </button>

            {statuses.map((status) => (
              <button
                type="button"
                key={status.id}
                onClick={() => setViewingStatus(status)}
                className="flex w-20 shrink-0 flex-col items-center gap-2"
              >
                <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-cyan-400 bg-slate-800 p-1">
                  {status.image ? (
                    <img
                      src={status.image.data}
                      alt=""
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <Avatar
                      name={status.user_name}
                      src={status.user_avatar}
                      size="h-full w-full"
                    />
                  )}
                </span>
                <span className="max-w-20 truncate text-xs">
                  {status.user_name}
                </span>
              </button>
            ))}
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
          
          <aside className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold">Groups</h2>
              <Users size={19} className="text-cyan-400" />
            </div>

            {showGroupForm && (
              <form
                onSubmit={createGroup}
                className="mb-4 space-y-2"
              >
                <input
                  value={newGroupName}
                  onChange={(event) =>
                    setNewGroupName(event.target.value)
                  }
                  placeholder="New group name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-cyan-500"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-cyan-600 px-3 py-2 text-sm font-semibold"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowGroupForm(false)}
                    className="rounded-lg bg-slate-800 px-3 py-2 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {groups.map((group) => (
                <button
                  type="button"
                  key={group.id}
                  onClick={() => chooseGroup(group.id)}
                  className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
                    selectedGroupId === group.id
                      ? "bg-cyan-950 text-cyan-200 ring-1 ring-cyan-700"
                      : "hover:bg-slate-800"
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800">
                    {group.id === "everyone" ? (
                      <Users size={20} />
                    ) : (
                      <MessageCircle size={20} />
                    )}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">
                      {group.name}
                    </span>
                    <span className="text-xs text-slate-400">
                      {group.id === "everyone"
                        ? "Community group"
                        : `${group.member_count} members`}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                setShowGroupForm((value) => !value)
              }
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-600 px-3 py-3 text-sm font-semibold text-slate-300 hover:border-cyan-500 hover:text-cyan-300"
            >
              <Plus size={17} />
              Create a Group
            </button>

            <p className="mt-4 text-xs leading-5 text-slate-500">
              Demo mode: groups and messages are saved in this browser only.
            </p>
          </aside>

          {/* CHAT AREA */}
          <section className="flex min-h-[520px] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <div className="flex items-center gap-3 border-b border-slate-800 p-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-950 text-cyan-300">
                <Users size={22} />
              </span>
              <div>
                <h2 className="font-bold">
                  {selectedGroup?.name || "Group Chat"}
                </h2>
                <p className="text-xs text-slate-400">
                  {selectedGroupId === "everyone"
                    ? "Welcome to the ImpanoLink community"
                    : "Group conversation"}
                </p>
              </div>
            </div>

            {/* MESSAGE LIST */}
            <div className="flex-1 space-y-4 bg-slate-900 p-4">
              {messages.length === 0 && (
                <div className="flex min-h-64 flex-col items-center justify-center text-center">
                  <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-cyan-300">
                    <MessageCircle size={26} />
                  </span>
                  <h3 className="font-semibold">
                    Start the conversation
                  </h3>
                  <p className="mt-1 max-w-xs text-sm text-slate-400">
                    Be the first to share an idea or introduce yourself in this group.
                  </p>
                </div>
              )}

              {messages.map((item) => {
                const isMine =
                  item.sender_name === currentUser.name;

                return (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 ${
                      isMine ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Avatar
                      name={item.sender_name}
                      src={item.sender_avatar}
                    />

                    <div
                      className={`flex max-w-[85%] flex-col ${
                        isMine ? "items-end" : "items-start"
                      }`}
                    >
                      <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        <span className="font-semibold text-slate-200">
                          {item.sender_name}
                        </span>
                        <span>{formatTime(item.created_at)}</span>
                      </div>

                      <div
                        className={`rounded-2xl px-4 py-3 text-sm ${
                          isMine
                            ? "rounded-tr-sm bg-cyan-700 text-white"
                            : "rounded-tl-sm bg-slate-800 text-slate-100"
                        }`}
                      >
                        {item.message && (
                          <p className="whitespace-pre-wrap break-words">
                            {item.message}
                          </p>
                        )}

                        {item.files?.map((file) => (
                          <div key={file.id} className="mt-2">
                            {file.type.startsWith("image/") ? (
                              <a
                                href={file.data}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src={file.data}
                                  alt={file.name}
                                  className="max-h-56 rounded-lg object-contain"
                                />
                              </a>
                            ) : (
                              <a
                                href={file.data}
                                download={file.name}
                                className="underline"
                              >
                                {file.name}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SELECTED FILES */}
            {selectedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 border-t border-slate-800 px-4 pt-3">
                {selectedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-xs"
                  >
                    <Paperclip size={14} />
                    <span className="max-w-36 truncate">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSelectedFile(file.id)}
                      aria-label={`Remove ${file.name}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* MESSAGE INPUT */}
            <form
              onSubmit={sendMessage}
              className="flex items-end gap-2 border-t border-slate-800 p-3 sm:p-4"
            >
              <label className="cursor-pointer rounded-xl p-3 text-slate-400 hover:bg-slate-800 hover:text-cyan-300">
                <Paperclip size={20} />
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.txt,.doc,.docx"
                  onChange={handleMessageFiles}
                  className="hidden"
                />
              </label>

              <textarea
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey
                  ) {
                    event.preventDefault();
                    event.currentTarget.form.requestSubmit();
                  }
                }}
                rows={1}
                placeholder={`Message ${selectedGroup?.name || "group"}...`}
                className="max-h-32 min-h-12 flex-1 resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />

              <button
                type="submit"
                aria-label="Send message"
                className="rounded-xl bg-cyan-600 p-3 text-white hover:bg-cyan-500"
              >
                <Send size={20} />
              </button>
            </form>
          </section>
        </div>
      </div>

      {/* ADD STATUS MODAL */}
      {showStatusForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <form
            onSubmit={saveStatus}
            className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Create Status
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Share a text update or a photo.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowStatusForm(false)}
                aria-label="Close status form"
                className="rounded-lg p-2 hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-4 flex items-center gap-3">
              <Avatar
                name={currentUser.name}
                src={currentUser.avatar}
                size="h-11 w-11"
              />
              <div>
                <p className="font-semibold">
                  {currentUser.name}
                </p>
                <p className="text-xs text-slate-400">
                  Your status
                </p>
              </div>
            </div>

            <textarea
              value={statusText}
              onChange={(event) =>
                setStatusText(event.target.value)
              }
              rows={4}
              placeholder="What would you like to share?"
              className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm outline-none focus:border-cyan-500"
            />

            {statusImage && (
              <div className="relative mt-3">
                <img
                  src={statusImage.data}
                  alt="Status preview"
                  className="max-h-56 w-full rounded-xl object-contain"
                />
                <button
                  type="button"
                  onClick={() => setStatusImage(null)}
                  aria-label="Remove status image"
                  className="absolute right-2 top-2 rounded-full bg-black/70 p-2"
                >
                  <X size={17} />
                </button>
              </div>
            )}

            <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-700 p-3 text-sm hover:bg-slate-800">
              <ImageIcon
                size={19}
                className="text-emerald-400"
              />
              Add a photo
              <input
                type="file"
                accept="image/*"
                onChange={handleStatusImage}
                className="hidden"
              />
            </label>

            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-cyan-600 px-4 py-3 font-bold hover:bg-cyan-500"
            >
              Save Status
            </button>
          </form>
        </div>
      )}

      {/* VIEW STATUS */}
      {viewingStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
            <button
              type="button"
              onClick={() => setViewingStatus(null)}
              aria-label="Close status"
              className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 p-4">
              <Avatar
                name={viewingStatus.user_name}
                src={viewingStatus.user_avatar}
                size="h-10 w-10"
              />
              <div>
                <p className="font-semibold">
                  {viewingStatus.user_name}
                </p>
                <p className="text-xs text-slate-400">
                  {formatTime(viewingStatus.created_at)}
                </p>
              </div>
            </div>

            {viewingStatus.image && (
              <img
                src={viewingStatus.image.data}
                alt="Shared status"
                className="max-h-[60vh] w-full bg-black object-contain"
              />
            )}

            {viewingStatus.text && (
              <p className="whitespace-pre-wrap p-5 text-center text-lg">
                {viewingStatus.text}
              </p>
            )}
          </div>
        </div>
      )}

      {/* SETTINGS */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <section className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Chat Settings
              </h2>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                aria-label="Close settings"
                className="rounded-lg p-2 hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <label className="flex items-center justify-between gap-3 border-b border-slate-800 py-4">
              <span>
                <span className="block font-semibold">
                  Online status
                </span>
                <span className="text-sm text-slate-400">
                  Show whether you are available.
                </span>
              </span>
              <input
                type="checkbox"
                checked={online}
                onChange={(event) =>
                  setOnline(event.target.checked)
                }
                className="h-5 w-5 accent-cyan-500"
              />
            </label>

            <div className="border-b border-slate-800 py-4">
              <p className="font-semibold">
                Browser notifications
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Allow browser notifications when supported.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={enableBrowserNotifications}
                  className="rounded-xl bg-cyan-700 px-3 py-2 text-sm font-semibold hover:bg-cyan-600"
                >
                  Enable notifications
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setNotificationsEnabled(false)
                  }
                  className="rounded-xl bg-slate-800 px-3 py-2 text-sm"
                >
                  Turn off
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Notifications are a demo setting; real incoming-message alerts need a connected backend.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowSettings(false)}
              className="mt-5 w-full rounded-xl bg-cyan-600 px-4 py-3 font-bold hover:bg-cyan-500"
            >
              Done
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
