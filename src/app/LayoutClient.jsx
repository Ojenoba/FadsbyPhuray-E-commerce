"use client";

import LayoutContent from "./LayoutContent";

export default function LayoutClient({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Wrap children with LayoutContent so navbar + auth logic apply everywhere */}
      <LayoutContent>{children}</LayoutContent>
    </div>
  );
}