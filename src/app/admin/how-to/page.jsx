"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext"; // ✅ admin context

function Section({ id, title, children }) {
  return (
    <div id={id} className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6 mb-8">
      <h2 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">{title}</h2>
      <div className="space-y-4 text-[#666]">{children}</div>
    </div>
  );
}

function TipBox({ color, title, children }) {
  const colors = {
    blue: "bg-blue-50 border-l-4 border-blue-500 text-blue-800",
    green: "bg-green-50 border-l-4 border-green-500 text-green-800",
  };
  return (
    <div className={`${colors[color]} p-4 rounded`}>
      <p className="font-bold mb-2">{title}</p>
      <div className="text-sm">{children}</div>
    </div>
  );
}

export default function HowToPage() {
  const { status } = useAdminAuth();
  const router = useRouter();

  // ✅ Guard: redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login?reason=not-logged-in");
    }
  }, [status, router]);

  if (status === "loading") return <p>Checking admin authentication...</p>;
  if (status === "unauthenticated") return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] to-white p-4 pt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#8B4513] mb-2 font-sora">How To Use Your Store</h1>
        <p className="text-[#666] mb-12 text-lg">Complete step-by-step guide to managing your site</p>

        {/* Quick Links */}
        <Section id="quick-links" title="Quick Links">
          <ul className="space-y-2">
            <li><a href="#add-products" className="text-[#FF6B35] hover:underline font-medium">→ Add and Manage Products</a></li>
            <li><a href="#announcements" className="text-[#FF6B35] hover:underline font-medium">→ Create Announcements</a></li>
            <li><a href="#view-orders" className="text-[#FF6B35] hover:underline font-medium">→ View Customer Orders</a></li>
            <li><a href="#menu" className="text-[#FF6B35] hover:underline font-medium">→ Where To Find Everything</a></li>
          </ul>
        </Section>

        {/* Add Products */}
        <Section id="add-products" title="✅ How To Add Products">
          <p><strong>Step 1:</strong> Tap ☰ Menu icon</p>
          <p><strong>Step 2:</strong> Go to <a href="/admin/products" className="text-[#FF6B35] underline">/admin/products</a></p>
          <p><strong>Step 3:</strong> Tap "+ Add Product"</p>
          <p><strong>Step 4:</strong> Fill in product details (name, price, category, stock, description, image URL)</p>
          <p><strong>Step 5:</strong> Tap "Add Product" to publish</p>
          <TipBox color="blue" title="💡 Tips">
            <ul className="list-disc list-inside space-y-1">
              <li>Use free image hosts like imgur.com or unsplash.com</li>
              <li>You can edit or delete products anytime</li>
              <li>Prices must be in Naira (₦) and numbers only</li>
            </ul>
          </TipBox>
        </Section>

        {/* Announcements */}
        <Section id="announcements" title="📢 How To Create Announcements">
          <p><strong>Step 1:</strong> Tap ☰ Menu icon</p>
          <p><strong>Step 2:</strong> Go to <a href="/admin/announcements" className="text-[#FF6B35] underline">/admin/announcements</a></p>
          <p><strong>Step 3:</strong> Tap "+ New Announcement"</p>
          <p><strong>Step 4:</strong> Enter title and content</p>
          <p><strong>Step 5:</strong> Check "Show this announcement" and publish</p>
          <TipBox color="blue" title="💡 Tip">
            Announcements appear at the top of your site for maximum visibility.
          </TipBox>
        </Section>

        {/* View Orders */}
        <Section id="view-orders" title="📦 How To View Customer Orders">
          <p><strong>Step 1:</strong> Tap ☰ Menu icon</p>
          <p><strong>Step 2:</strong> Go to Dashboard</p>
          <p><strong>Step 3:</strong> View orders and tap for details</p>
          <TipBox color="blue" title="ℹ️ Note">
            You can see customer names, items purchased, and order dates.
          </TipBox>
        </Section>

        {/* Menu Navigation */}
        <Section id="menu" title="🗺️ Where To Find Everything">
          <ul className="space-y-2">
            <li><strong>Dashboard:</strong> View orders and sales</li>
            <li><strong>Wallet:</strong> Check your account balance</li>
            <li><strong>Orders:</strong> View customer purchases</li>
            <li><strong>Referrals:</strong> Share your store and earn</li>
            <li><strong>Withdrawals:</strong> Withdraw earnings</li>
            <li><strong>Profile:</strong> Edit account info</li>
          </ul>
        </Section>

        {/* Payment Info */}
        <Section id="payments" title="💳 About Payments (IMPORTANT!)">
          <p>Your store is in <strong>LIVE MODE</strong> with real Naira payments via Flutterwave.</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Customers pay real money through Flutterwave</li>
            <li>Payments go directly to your Flutterwave account</li>
            <li>Payment status visible in dashboard</li>
            <li>Withdrawals sent to your bank account</li>
          </ul>
          <TipBox color="green" title="✅ Good News">
            API keys are already set up correctly in LIVE mode.
          </TipBox>
          <TipBox color="blue" title="ℹ️ Test a Payment">
            Add a product, checkout, and use a Flutterwave test card to verify.
          </TipBox>
        </Section>

        {/* Back Button */}
        <div className="mt-12">
          <a
            href="/admin"
            className="block w-full px-6 py-4 bg-[#FF6B35] text-white rounded-lg font-bold text-center hover:bg-[#E55A24] transition-colors"
          >
            ← Back to Admin Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}