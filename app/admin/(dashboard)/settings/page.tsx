import { getAdminUser } from "@/lib/admin-auth";
import AdminHeader from "../../components/AdminHeader";

export default async function AdminSettingsPage() {
  const { user } = await getAdminUser();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "Not configured";

  return (
    <>
      <AdminHeader
        title="Admin Settings & Configuration"
        subtitle="Supabase connectivity, security posture, and administrator details"
      />

      <div className="admin-body">
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Admin Profile */}
          <div className="admin-card">
            <h2
              style={{
                fontSize: "17px",
                fontWeight: 800,
                color: "var(--admin-navy)",
                marginBottom: "16px",
              }}
            >
              Current Administrator
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "16px",
              }}
            >
              <div
                style={{
                  padding: "14px 18px",
                  backgroundColor: "var(--admin-bg)",
                  borderRadius: "var(--admin-radius-md)",
                  border: "1px solid var(--admin-border)",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--admin-text-muted)",
                    textTransform: "uppercase",
                  }}
                >
                  Admin Email
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "var(--admin-navy)",
                    marginTop: "4px",
                  }}
                >
                  {user?.email || "Unknown"}
                </div>
              </div>

              <div
                style={{
                  padding: "14px 18px",
                  backgroundColor: "var(--admin-bg)",
                  borderRadius: "var(--admin-radius-md)",
                  border: "1px solid var(--admin-border)",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--admin-text-muted)",
                    textTransform: "uppercase",
                  }}
                >
                  Auth User ID
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    fontFamily: "monospace",
                    color: "var(--admin-navy)",
                    marginTop: "4px",
                  }}
                >
                  {user?.id || "N/A"}
                </div>
              </div>

              <div
                style={{
                  padding: "14px 18px",
                  backgroundColor: "var(--admin-bg)",
                  borderRadius: "var(--admin-radius-md)",
                  border: "1px solid var(--admin-border)",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--admin-text-muted)",
                    textTransform: "uppercase",
                  }}
                >
                  Authorization Status
                </div>
                <div style={{ marginTop: "4px" }}>
                  <span className="badge badge-success">Verified Admin in public.admin_users</span>
                </div>
              </div>
            </div>
          </div>

          {/* Database & Infrastructure */}
          <div className="admin-card">
            <h2
              style={{
                fontSize: "17px",
                fontWeight: 800,
                color: "var(--admin-navy)",
                marginBottom: "16px",
              }}
            >
              Backend & Supabase Infrastructure
            </h2>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  borderBottom: "1px solid var(--admin-border-subtle)",
                }}
              >
                <span style={{ fontWeight: 600 }}>Supabase Project Endpoint</span>
                <span style={{ fontFamily: "monospace", color: "var(--admin-text-muted)" }}>
                  {supabaseUrl}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  borderBottom: "1px solid var(--admin-border-subtle)",
                }}
              >
                <span style={{ fontWeight: 600 }}>Row Level Security (RLS)</span>
                <span className="badge badge-success">Enabled (Strict)</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  borderBottom: "1px solid var(--admin-border-subtle)",
                }}
              >
                <span style={{ fontWeight: 600 }}>Client Authentication</span>
                <span style={{ fontWeight: 600 }}>@supabase/ssr (Cookie-based Sessions)</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                }}
              >
                <span style={{ fontWeight: 600 }}>Storage Bucket for Images</span>
                <span style={{ fontWeight: 600, color: "#d97706" }}>
                  product-images (Public Read / Admin Write)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
