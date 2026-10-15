import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "talent",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://impanolink.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed.");
      }

      sessionStorage.setItem("impanolink_token", data.token);
      sessionStorage.setItem(
        "impanolink_user",
        JSON.stringify(data.user)
      );

     navigate('/profile')
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to ImpanoLink server. Please try again."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#101c35] px-4 py-12 text-white">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-700 bg-[#172641] p-6 shadow-xl sm:p-8">
        <h1 className="mb-2 text-3xl font-bold">
          Create your account
        </h1>

        <p className="mb-6 text-slate-300">
          Join ImpanoLink and turn your talent into opportunities.
        </p>

        {error && (
          <p
            role="alert"
            className="mb-4 rounded-lg bg-red-950 p-3 text-red-200"
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="full_name" className="mb-1 block">
              Full name
            </label>
            <input
              id="full_name"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              required
              maxLength={100}
              autoComplete="name"
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-slate-600 bg-[#101c35] p-3 outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              maxLength={254}
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-600 bg-[#101c35] p-3 outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
              maxLength={72}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              className="w-full rounded-lg border border-slate-600 bg-[#101c35] p-3 outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label htmlFor="role" className="mb-1 block">
              I want to join as
            </label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-600 bg-[#101c35] p-3 outline-none focus:border-cyan-400"
            >
              <option value="talent">Talent — showcase my skills</option>
              <option value="employer">Employer — find talented people</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-cyan-500 p-3 font-bold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-cyan-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}