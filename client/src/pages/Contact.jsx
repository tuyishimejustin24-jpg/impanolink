
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [searchParams] = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    searchParams.get("service") || ""
  );
  const [notice, setNotice] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setNotice("Please complete all fields before submitting.");
      return;
    }

    const subject = encodeURIComponent(
      `ImpanoLink Contact Message - ${cleanName}`
    );

    const body = encodeURIComponent(
      `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`
    );

    setNotice("Your email application will open so you can send your message.");

    window.location.href =
      `mailto:contact@impanolink.com?subject=${subject}&body=${body}`;
  }

  return (
    <main className="min-h-screen bg-[#101c35] px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
        <section>
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">
            Contact Us
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Let's talk about what you need.
          </h1>

          <p className="mt-5 max-w-lg leading-7 text-slate-400">
            Have a question, an idea, or need a particular service?
            Send us a message. We would love to hear from you.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-4">
              <span className="rounded-lg bg-teal-400/10 p-3 text-teal-300">
                <Mail size={21} />
              </span>

              <div>
                <h2 className="font-semibold">Email</h2>
                <a
                  href="mailto:contact@impanolink.com"
                  className="mt-1 block text-sm text-slate-400 hover:text-teal-300"
                >
                  contact@impanolink.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="rounded-lg bg-teal-400/10 p-3 text-teal-300">
                <MapPin size={21} />
              </span>

              <div>
                <h2 className="font-semibold">Location</h2>
                <p className="mt-1 text-sm text-slate-400">Rwanda</p>
              </div>
            </div>
          </div>
        </section>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-white/10 bg-[#1a2944] p-5 sm:p-7"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={100}
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-white/10 bg-[#101c35] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-teal-400"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-white/10 bg-[#101c35] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-teal-400"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Your Message
            </label>

            <textarea
              id="message"
              name="message"
              required
              rows={5}
              maxLength={5000}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write your message here..."
              className="w-full resize-y rounded-lg border border-white/10 bg-[#101c35] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-teal-400"
            />
          </div>

          {notice && (
            <p
              role="status"
              className="rounded-lg border border-teal-400/30 bg-teal-400/10 p-3 text-sm text-teal-200"
            >
              <CheckCircle className="mr-2 inline" size={17} />
              {notice}
            </p>
          )}

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-3.5 font-semibold text-white transition hover:bg-teal-600"
          >
            Open Email to Send <Send size={17} />
          </button>

          <p className="text-xs leading-5 text-slate-400">
            Your email application must be configured to send the message.
            This form does not send messages directly from the website.
          </p>
        </form>
      </div>
    </main>
  );
}
