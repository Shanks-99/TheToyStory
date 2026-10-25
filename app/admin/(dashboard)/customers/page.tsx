import AdminHeader from "../../components/AdminHeader";

export default function AdminCustomersPage() {
  return (
    <>
      <AdminHeader
        title="Customer Directory"
        subtitle="Manage shopper profiles, delivery contact information, and purchase frequency"
      />

      <div className="admin-body">
        <div className="admin-card" style={{ textAlign: "center", padding: "64px 24px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              margin: "0 auto 20px",
              backgroundColor: "var(--admin-bg)",
              border: "1px solid var(--admin-border)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
            }}
          >
            👥
          </div>

          <h2
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: "var(--admin-navy)",
              marginBottom: "8px",
            }}
          >
            Customer Accounts (Future-Ready)
          </h2>

          <p
            style={{
              fontSize: "14px",
              color: "var(--admin-text-muted)",
              maxWidth: "520px",
              margin: "0 auto 24px",
              lineHeight: 1.6,
            }}
          >
            No external customer profiles registered yet. When customers check out or register customer accounts, their contact details, order frequency, and saved delivery addresses will be consolidated here.
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              backgroundColor: "var(--admin-primary-light)",
              color: "var(--admin-primary-text)",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            <span>💡</span>
            <span>Accurate Empty State: 0 Customers Recorded</span>
          </div>
        </div>
      </div>
    </>
  );
}
