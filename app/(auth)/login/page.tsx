"use client";

import { useActionState } from "react";
import { signIn } from "next-auth/react";
import { AlertCircle } from "lucide-react";
import { loginAction } from "./actions";
import { es } from "@/lib/i18n/es";

const initialState = { error: "" };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="mb-8 text-center">
          <h1
            className="text-4xl font-bold tracking-tight"
            style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.03em" }}
          >
            CLICK
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--cl-text-secondary)" }}>
            Tu mercado hondureño
          </p>
        </div>

        {/* Credentials form */}
        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium"
              style={{ color: "var(--cl-text-secondary)" }}
            >
              {es.auth.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="rounded-[10px] px-4 py-3 text-base outline-none transition-all"
              style={{
                background: "var(--cl-surface-raised)",
                border: "1px solid var(--cl-border)",
                color: "var(--cl-text-primary)",
              }}
              onFocus={(e) => (e.currentTarget.style.border = "1px solid var(--cl-accent)")}
              onBlur={(e) => (e.currentTarget.style.border = "1px solid var(--cl-border)")}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium"
              style={{ color: "var(--cl-text-secondary)" }}
            >
              {es.auth.password}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="rounded-[10px] px-4 py-3 text-base outline-none transition-all"
              style={{
                background: "var(--cl-surface-raised)",
                border: "1px solid var(--cl-border)",
                color: "var(--cl-text-primary)",
              }}
              onFocus={(e) => (e.currentTarget.style.border = "1px solid var(--cl-accent)")}
              onBlur={(e) => (e.currentTarget.style.border = "1px solid var(--cl-border)")}
            />
          </div>

          {state.error && (
            <div
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm"
              style={{ background: "rgba(239,68,68,0.10)", color: "#EF4444" }}
            >
              <AlertCircle size={15} />
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-1 min-h-[3rem] w-full rounded-xl text-base font-semibold text-white transition-all active:scale-[0.97] disabled:opacity-35"
            style={{ background: isPending ? "var(--cl-accent-hover)" : "var(--cl-accent)" }}
          >
            {isPending ? "Ingresando..." : es.auth.login}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <hr className="flex-1" style={{ borderColor: "var(--cl-border)" }} />
          <span className="text-xs" style={{ color: "var(--cl-text-muted)" }}>
            {es.auth.orContinueWith}
          </span>
          <hr className="flex-1" style={{ borderColor: "var(--cl-border)" }} />
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex w-full items-center justify-center gap-3 min-h-[3rem] rounded-xl border text-base font-medium transition-all active:scale-[0.97]"
          style={{
            background: "transparent",
            border: "1px solid var(--cl-border)",
            color: "var(--cl-text-primary)",
          }}
        >
          {/* Google G mark */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
          </svg>
          {es.auth.google}
        </button>
      </div>
    </div>
  );
}
