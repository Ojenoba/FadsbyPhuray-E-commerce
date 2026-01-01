import "./globals.css";
import ClientProviders from "./ClientProviders";
import LayoutClient from "./LayoutClient";

export const metadata = {
  title: "FADs by PHURAY - Affordable Fashion",
  description: "Discover fascinating & trendy fashion at affordable prices.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-[#FFF5E6] to-white">
        {/* ✅ All global providers are applied here */}
        <ClientProviders>
          <div className="flex flex-col min-h-screen">
            <LayoutClient>{children}</LayoutClient>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}