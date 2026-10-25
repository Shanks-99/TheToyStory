import Link from "next/link";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function AdminHeader({
  title,
  subtitle,
  children,
}: AdminHeaderProps) {
  return (
    <header className="admin-header">
      <div className="admin-header-title">
        <h1>{title}</h1>
        {subtitle && (
          <p
            style={{
              fontSize: "12px",
              color: "var(--admin-text-muted)",
              margin: "2px 0 0",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <div className="admin-header-actions">
        {children}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="store-preview-link"
          title="Open live storefront in new tab"
        >
          <span>🛍️</span>
          <span>View Store</span>
          <span style={{ fontSize: "11px", opacity: 0.6 }}>↗</span>
        </Link>
      </div>
    </header>
  );
}
