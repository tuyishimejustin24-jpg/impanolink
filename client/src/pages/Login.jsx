import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
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
        "https://impanolink.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed.");
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
          Welcome back
        </h1>

        <p className="mb-6 text-slate-300">
          Login to continue your ImpanoLink journey.
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
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-600 bg-[#101c35] p-3 outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-cyan-500 p-3 font-bold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-cyan-400 hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </main>
  );
}