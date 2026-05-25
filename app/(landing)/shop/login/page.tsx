"use client";

import Link from "next/link";
import { Globe, ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div
      style={{
        padding: "64px 36px 80px",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 600px 400px at 50% 0%, rgba(15,157,190,0.07), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: 440,
          padding: "36px 36px 32px",
          background: "var(--lp-surface)",
          border: "1px solid var(--lp-line)",
          borderRadius: 12,
          position: "relative",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: 11,
            color: "var(--lp-ink3)",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          Bienvenido de vuelta
        </div>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: "var(--lp-ink)",
            letterSpacing: "-0.8px",
            margin: "0 0 22px",
            lineHeight: 1.2,
          }}
        >
          Entra a tu cuenta CLICK.
        </h1>

        <button
          onClick={() => signIn("google", { callbackUrl: "/shop/account" })}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 8,
            background: "var(--lp-surface)",
            border: "1px solid var(--lp-line2)",
            color: "var(--lp-ink)",
            fontSize: 13.5,
            fontWeight: 500,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 14,
            cursor: "pointer",
          }}
        >
          <Globe size={16} strokeWidth={1.7} /> Continuar con Google
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "14px 0" }}>
          <div style={{ flex: 1, height: 1, background: "var(--lp-line)" }} />
          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 10.5,
              color: "var(--lp-ink3)",
              letterSpacing: "0.4px",
              textTransform: "uppercase",
            }}
          >
            o con correo
          </span>
          <div style={{ flex: 1, height: 1, background: "var(--lp-line)" }} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const email = (form.elements.namedItem("email") as HTMLInputElement).value;
            const password = (form.elements.namedItem("password") as HTMLInputElement).value;
            signIn("credentials", { email, password, callbackUrl: "/shop/account" });
          }}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontFamily: "var(--font-geist-mono)",
                fontSize: 10.5,
                color: "var(--lp-ink3)",
                letterSpacing: "0.4px",
                marginBottom: 6,
              }}
            >
              Correo
            </label>
            <input
              name="email"
              placeholder="daniela@correo.hn"
              type="email"
              autoComplete="email"
              style={{
                width: "100%",
                padding: "11px 14px",
                border: "1px solid var(--lp-line)",
                borderRadius: 6,
                fontSize: 14,
                color: "var(--lp-ink)",
                outline: "none",
                background: "var(--lp-paper)",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <label
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 10.5,
                  color: "var(--lp-ink3)",
                  letterSpacing: "0.4px",
                }}
              >
                Contraseña
              </label>
              <a
                href="#"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 10.5,
                  color: "var(--lp-accent)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Olvidé mi contraseña
              </a>
            </div>
            <input
              name="password"
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "11px 14px",
                border: "1px solid var(--lp-line)",
                borderRadius: 6,
                fontSize: 14,
                color: "var(--lp-ink)",
                outline: "none",
                background: "var(--lp-paper)",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: 6,
              width: "100%",
              padding: "13px 16px",
              borderRadius: 6,
              background: "var(--lp-ink)",
              color: "#FFF",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "-0.1px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              border: "none",
              cursor: "pointer",
            }}
          >
            Entrar <ArrowRight size={14} strokeWidth={2.2} />
          </button>
        </form>

        <div style={{ marginTop: 22, textAlign: "center", fontSize: 13, color: "var(--lp-ink3)" }}>
          ¿Primera vez en CLICK?{" "}
          <Link href="#" style={{ color: "var(--lp-accent)", fontWeight: 600, textDecoration: "none" }}>
            Crea una cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}
