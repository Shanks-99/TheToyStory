"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOutAdminAction } from "../actions";

export default function AccessDenied({ userEmail }: { userEmail: string }) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await signOutAdminAction();
    router.push("/admin/login");
    router.refresh();
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
          maxWidth: "460px",
          width: "100%",
          textAlign: "center",
          padding: "36px 32px",
          borderRadius: "var(--admin-radius-xl)",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            margin: "0 auto 16px",
            backgroundColor: "var(--admin-danger-light)",
            color: "var(--admin-danger)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
          }}
        >
          🚫
        </div>

        <h1
          style={{
            fontSize: "22px",
            fontWeight: 800,
            color: "var(--admin-navy)",
            marginBottom: "8px",
          }}
        >
          Access Denied
        </h1>

        <p
          style={{
            fontSize: "14px",
            color: "var(--admin-text-muted)",
            lineHeight: 1.5,
            marginBottom: "20px",
          }}
        >
          You are signed in as{" "}
          <strong style={{ color: "var(--admin-navy)" }}>{userEmail}</strong>,
          but this account does not have administrator privileges listed in{" "}
          <code>public.admin_users</code>.
        </p>

        <div
          style={{
            padding: "12px",
            backgroundColor: "var(--admin-bg)",
            borderRadius: "var(--admin-radius-md)",
            border: "1px solid var(--admin-border)",
            fontSize: "13px",
            color: "#64748b",
            marginBottom: "24px",
          }}
        >
          If you believe this is a mistake, please contact the store
          administrator to have your user ID added to the admin list.
        </div>

        <button
          onClick={handleSignOut}
          className="btn-danger"
          style={{ width: "100%", padding: "11px" }}
          disabled={signingOut}
        >
          {signingOut ? "Signing Out..." : "Sign Out of This Account"}
        </button>
      </div>
    </div>
  );
}
