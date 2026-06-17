import type { Metadata } from "next";
import "./globals.css";
import { RoleProvider } from "@/lib/roleContext";
import Sidebar from "@/components/layout/Sidebar";
import RoleSwitcher from "@/components/layout/RoleSwitcher";
import MockModeBanner from "@/components/layout/MockModeBanner";

export const metadata: Metadata = {
  title: "Fortune Towers Community Portal",
  description: "Community portal for residential flat owners welfare association. Manage accounts, events, members, notices, complaints and more.",
  keywords: "Fortune Towers, community portal, residents, apartment management, welfare association",
  authors: [{ name: "Fortune Towers Owners Association" }],
  icons: {
    icon: "/aditya-logo.jpg",
    apple: "/aditya-logo.jpg",
  },
  openGraph: {
    title: "Fortune Towers Community Portal",
    description: "Residential Community Management Platform",
    siteName: "Fortune Towers Portal",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <RoleProvider>
          <MockModeBanner />
          <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar />
            <main style={{ flex: 1, overflow: "auto" }}>{children}</main>
          </div>
          <RoleSwitcher />
        </RoleProvider>
      </body>
    </html>
  );
}
