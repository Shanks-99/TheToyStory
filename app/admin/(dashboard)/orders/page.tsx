import Link from "next/link";
import AdminHeader from "../../components/AdminHeader";

export default function AdminOrdersPage() {
  return (
    <>
      <AdminHeader
        title="Orders & Shipments"
        subtitle="Manage customer orders, track fulfillment status, and review payment logs"
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
            🛍️
          </div>

          <h2
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: "var(--admin-navy)",
              marginBottom: "8px",
            }}
          >
            Orders Pipeline (Future-Ready)
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
            No orders have been placed yet. The Toy Story checkout and order collection pipeline is ready to be linked to this view. When shoppers complete purchases on the storefront, their order status, shipping addresses, and transaction amounts will appear here in real-time.
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
            <span>Accurate Empty State: 0 Orders Recorded</span>
          </div>
        </div>
      </div>
    </>
  );
}
