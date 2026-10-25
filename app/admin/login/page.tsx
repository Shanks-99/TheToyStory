"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInAdminAction } from "../actions";
import "../admin.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const result = await signInAdminAction(formData);

      if (!result.success) {
        setError(result.error || "Login failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      // Successful admin login
      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--admin-bg)",
        padding: "24px",
      }}
    >
      <div
        className="admin-card"
        style={{
          maxWidth: "440px",
          width: "100%",
          padding: "36px 32px",
          boxShadow: "var(--admin-shadow-lg)",
          borderRadius: "var(--admin-radius-xl)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              margin: "0 auto 14px",
              background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              boxShadow: "0 6px 16px rgba(245, 158, 11, 0.35)",
            }}
          >
            🧸
          </div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "var(--admin-navy)",
              marginBottom: "6px",
              letterSpacing: "-0.02em",
            }}
          >
            The Toy Story
          </h1>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#d97706",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              margin: 0,
            }}
          >
            Staff & Admin Portal
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: "12px 14px",
              backgroundColor: "var(--admin-danger-light)",
              color: "var(--admin-danger-text)",
              borderRadius: "var(--admin-radius-md)",
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "20px",
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              lineHeight: 1.4,
            }}
          >
            <span style={{ fontSize: "16px" }}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">
              Admin Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="email"
              placeholder="admin@thetoystory.com"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "26px" }}>
            <label className="form-label" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "15px",
              opacity: loading ? 0.75 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  style={{
                    display: "inline-block",
                    width: "16px",
                    height: "16px",
                    border: "2px solid #0f172a",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                Verifying Credentials...
              </>
            ) : (
              "Sign In to Admin"
            )}
          </button>
        </form>

        <div
          style={{
            marginTop: "24px",
            paddingTop: "20px",
            borderTop: "1px solid var(--admin-border-subtle)",
            textAlign: "center",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: "13px",
              color: "var(--admin-text-muted)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontWeight: 500,
            }}
          >
            ← Return to Public Storefront
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
