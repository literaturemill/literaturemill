"use client";

import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../supabaseClient"; // adjust if your path differs

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialView?: "sign_in" | "sign_up";
};

export default function AuthModal({ isOpen, onClose, initialView = "sign_in" }: AuthModalProps) {
  const [authView, setAuthView] = useState<"sign_in" | "sign_up">(initialView);

  // Sync view every time modal is triggered
  useEffect(() => {
    if (isOpen) {
      setAuthView(initialView);
    }
  }, [isOpen, initialView]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
        <button
          onClick={() => {
            onClose();
            setAuthView("sign_in"); // reset to sign in after close
          }}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-lg font-bold"
        >
          ✕
        </button>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: authView === "sign_up" ? "#6366f1" : "#10b981", // indigo vs green
                  brandAccent: authView === "sign_up" ? "#4f46e5" : "#059669",
                },
              },
            },
          }}
          theme="dark"
          providers={["google"]}
          view={authView}
          showLinks={true}
          {...({
            onViewChange: (view: "sign_in" | "sign_up") => setAuthView(view),
          } as any)}
          redirectTo=""
        />
      </div>
    </div>
  );
}

