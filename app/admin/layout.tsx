import "./admin.css";

export const metadata = {
  title: "Admin Portal | The Toy Story",
  description: "Administrative dashboard for The Toy Story",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
