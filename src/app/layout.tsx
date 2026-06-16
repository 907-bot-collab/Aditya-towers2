import type { Metadata } from "next";
import "./globals.css";
import { RoleProvider } from "@/lib/roleContext";
import RoleSwitcher from "@/components/layout/RoleSwitcher";
import MockModeBanner from "@/components/layout/MockModeBanner";

export const metadata: Metadata = {
  title: "Fortune Towers Community Portal | Aditya Fortune Towers, Visakhapatnam",
  description: "Official community portal for Aditya Fortune Towers residents in Madhurawada, Visakhapatnam. Manage accounts, events, complaints, members directory, and community feed.",
  keywords: "Aditya Fortune Towers, Visakhapatnam, Madhurawada, community portal, residents, apartment management",
  authors: [{ name: "Fortune Towers Owners Association" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/aditya-logo.jpg",
    apple: "/aditya-logo.jpg",
  },
  openGraph: {
    title: "Fortune Towers Community Portal",
    description: "Residential Community Management Platform for Aditya Fortune Towers, Visakhapatnam",
    siteName: "Fortune Towers Portal",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RoleProvider>
          <MockModeBanner />
          {children}
          <RoleSwitcher />
        </RoleProvider>
      </body>
    </html>
  );
}
