import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [authData, setAuthData] = useState({ email: "", password: "" });
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field, e) => {
    setAuthData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      let result;
      if (isLogin) {
        result = await signInWithEmailAndPassword(auth, authData.email, authData.password);
        setSuccess("Login successful!");
      } else {
        result = await createUserWithEmailAndPassword(auth, authData.email, authData.password);
        setSuccess("Account created successfully!");
      }
      setUser(result.user);
      setAuthData({ email: "", password: "" });
      navigate("/trips");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      setSuccess("Google login successful!");
      navigate("/trips");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setAuthData({ email: "", password: "" });
      setIsLogin(true);
      setSuccess("Logged out successfully!");
      navigate("/auth");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tv-auth-bg d-flex align-items-center justify-content-center px-3">
      <div style={{ width: "100%", maxWidth: "440px", zIndex: 1 }}>
        <div className="tv-auth-card">
          {/* Header */}
          <div className="tv-auth-card-header">
            <div className="tv-auth-brand-icon">✈️</div>
            <h2>{user ? "Welcome Back" : isLogin ? "Welcome Back" : "Join TripVerse"}</h2>
            <p>
              {user
                ? "You are logged in"
                : isLogin
                ? "Sign in to continue your journey"
                : "Create your account and start exploring"}
            </p>
          </div>

          {/* Body */}
          <div className="tv-auth-card-body">
            {success && (
              <Alert variant="success" dismissible onClose={() => setSuccess("")} className="mb-3" style={{ borderRadius: "var(--tv-radius-md)", fontSize: "0.9rem" }}>
                ✅ {success}
              </Alert>
            )}
            {error && (
              <Alert variant="danger" dismissible onClose={() => setError("")} className="mb-3" style={{ borderRadius: "var(--tv-radius-md)", fontSize: "0.9rem" }}>
                ⚠️ {error}
              </Alert>
            )}

            {user ? (
              <div className="text-center">
                <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>👋</div>
                <p style={{ color: "var(--tv-text-secondary)", marginBottom: "1.5rem" }}>
                  Logged in as <strong>{user.email}</strong>
                </p>
                <button
                  className="tv-btn-auth-submit w-100"
                  onClick={handleLogout}
                  disabled={loading}
                  style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
                >
                  {loading ? <><Spinner size="sm" animation="border" className="me-2" />Please wait...</> : "🚪 Logout"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-3">
                  <label className="tv-form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control tv-form-control"
                    placeholder="you@example.com"
                    value={authData.email}
                    onChange={(e) => handleChange("email", e)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="tv-form-label">Password</label>
                  <input
                    type="password"
                    className="form-control tv-form-control"
                    placeholder="Min. 6 characters"
                    value={authData.password}
                    onChange={(e) => handleChange("password", e)}
                    minLength={6}
                    required
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="tv-btn-auth-submit w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <><Spinner size="sm" animation="border" className="me-2" />Please wait...</>
                  ) : isLogin ? "Sign In →" : "Create Account →"}
                </button>

                {/* Divider */}
                <div className="tv-auth-divider">OR</div>

                {/* Google */}
                <button
                  type="button"
                  className="tv-btn-google w-100 mb-3"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                    <path d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>

                {/* Toggle */}
                <p className="text-center mb-0" style={{ fontSize: "0.9rem", color: "var(--tv-text-secondary)" }}>
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => { setIsLogin((p) => !p); setError(""); setSuccess(""); }}
                    style={{
                      background: "none", border: "none", padding: 0,
                      color: "var(--tv-primary)", fontWeight: 700,
                      cursor: "pointer", fontSize: "0.9rem",
                    }}
                  >
                    {isLogin ? "Sign up" : "Login"}
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
