import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api.js";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mode, setMode] = useState(searchParams.get("mode") === "register" ? "register" : "login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [collegeAddress, setCollegeAddress] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSearchParams(mode === "register" ? { mode: "register" } : {});
  }, [mode]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await api.login({ email, password });
      } else {
        await api.register({ name, email, password });
        if (collegeName || collegeAddress || universityName) {
          await api.updateProfile({ name, collegeDetails: { collegeName, collegeAddress, universityName } });
        }
      }
      window.dispatchEvent(new Event("auth-changed"));
      navigate("/");
    } catch (err) {
      setError(err.message || `${mode === "login" ? "Login" : "Register"} failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{mode === "login" ? "Login" : "Create account"}</h1>
        <p className="text-sm text-gray-600 mb-6">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button onClick={() => setMode("register")} className="text-blue-600 hover:text-blue-700">Register</button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => setMode("login")} className="text-blue-600 hover:text-blue-700">Sign in</button>
            </>
          )}
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          {mode === "register" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">College Name (optional)</label>
                  <input type="text" className="w-full border rounded-lg px-3 py-2" value={collegeName} onChange={(e) => setCollegeName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">College Address (optional)</label>
                  <input type="text" className="w-full border rounded-lg px-3 py-2" value={collegeAddress} onChange={(e) => setCollegeAddress(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">University Name (optional)</label>
                  <input type="text" className="w-full border rounded-lg px-3 py-2" value={universityName} onChange={(e) => setUniversityName(e.target.value)} />
                </div>
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full border rounded-lg px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" className="w-full border rounded-lg px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 disabled:opacity-50">
            {loading ? (mode === "login" ? "Signing in..." : "Registering...") : (mode === "login" ? "Login" : "Register")}
          </button>
        </form>
      </div>
    </div>
  );
} 