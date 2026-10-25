import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-auth";
import AdminSidebar from "../components/AdminSidebar";
import AccessDenied from "../components/AccessDenied";

export const instant = false;

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin } = await getAdminUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (!isAdmin) {
    return <AccessDenied userEmail={user.email || "unknown"} />;
  }

  return (
    <div className="admin-shell">
      <AdminSidebar userEmail={user.email || "Admin"} />
      <div className="admin-main">{children}</div>
    </div>
  );
}
