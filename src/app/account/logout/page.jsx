"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import LogoutPageContent from "./LogoutPageContent";

export default function LogoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LogoutPageContent />
    </Suspense>
  );
}