"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/portal/LoginForm";

export default function PublicShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="relative min-h-screen">
      <Navbar onGetStarted={() => setShowLogin(true)} />

      <main className="overflow-x-hidden">
        {children}
      </main>

      <Footer />

      {showLogin && (
        <div className="fixed inset-0 z-[999]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#23272B]/45 backdrop-blur-md"
            onClick={() => setShowLogin(false)}
          />

          {/* Login modal */}
          <div className="relative flex min-h-screen items-center justify-center p-5 sm:p-8">
            <div className="relative w-full max-w-[460px] overflow-hidden rounded-2xl border border-[#E8E2D9] bg-[#FCFBF8] shadow-[0_30px_100px_-30px_rgba(35,39,43,0.45)]">
              <LoginForm
                onBack={() => setShowLogin(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}