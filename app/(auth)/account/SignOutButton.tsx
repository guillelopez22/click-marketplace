"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all active:scale-[0.97]"
      style={{ color: "#EF4444", background: "rgba(239,68,68,0.08)" }}
    >
      <LogOut size={15} />
      Cerrar sesión
    </button>
  );
}
