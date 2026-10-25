"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { signOutAdminAction } from "../actions";

interface AdminSidebarProps {
  userEmail: string;
}

const navLinks = [
  { href: "/admin", label: "Overview", icon: "📊" },
  { href: "/admin/products", label: "Products", icon: "🧸" },
  { href: "/admin/inventory", label: "Inventory", icon: "📦" },
  { href: "/admin/orders", label: "Orders", icon: "🛍️", badge: "Soon" },
  { href: "/admin/customers", label: "Customers", icon: "👥", badge: "Soon" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    await signOutAdminAction();
    router.push("/admin/login");
    router.refresh();
  }

  const initial = userEmail ? userEmail.charAt(0).toUpperCase() : "A";

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.4)",
            zIndex: 35,
          }}
        />
      )}

      <aside className={`admin-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="admin-sidebar-brand">
          <div className="brand-badge">🧸</div>
          <div>
            <div className="brand-title">The Toy Story</div>
            <div className="brand-subtitle">Admin Control</div>
          </div>
        </div>

        <nav className="admin-nav">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`admin-nav-item ${isActive ? "active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="nav-icon">{link.icon}</span>
                <span>{link.label}</span>
                {link.badge && (
                  <span className="admin-nav-badge">{link.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-pill">
            <div className="admin-user-avatar">{initial}</div>
            <div className="admin-user-info">
              <div className="admin-user-email" title={userEmail}>
                {userEmail}
              </div>
              <div className="admin-user-role">Administrator</div>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="admin-signout-btn"
            disabled={signingOut}
          >
            <span>🚪</span>
            <span>{signingOut ? "Signing Out..." : "Sign Out"}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
