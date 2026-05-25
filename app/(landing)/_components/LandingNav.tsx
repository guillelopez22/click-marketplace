"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plane,
  Search,
  ChevronDown,
  Menu,
  ShoppingCart,
  MapPin,
  X,
} from "lucide-react";

const CATS = [
  { label: "Electrónica",  slug: "Electrónica" },
  { label: "Hogar",        slug: "Hogar" },
  { label: "Ropa",         slug: "Ropa" },
  { label: "Deportes",     slug: "Deportes" },
  { label: "Belleza",      slug: "Belleza" },
  { label: "Libros",       slug: "Libros" },
  { label: "Bebés",        slug: "Bebés" },
  { label: "Ofertas",      slug: "Ofertas" },
];

export function LandingNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "var(--lp-surface)",
          borderBottom: "1px solid var(--lp-line)",
        }}
      >
        {/* Utility row — hidden on mobile */}
        <div
          className="lp-nav-utility"
          style={{ background: "var(--lp-paper2)", borderBottom: "1px solid var(--lp-line)" }}
        >
          <div
            style={{
              maxWidth: 1360,
              margin: "0 auto",
              padding: "7px 36px",
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontFamily: "var(--font-geist-mono)",
              fontSize: 11,
              color: "var(--lp-ink3)",
              letterSpacing: "0.3px",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <MapPin size={11} strokeWidth={2} style={{ color: "var(--lp-accent)" }} />
              Entregar en{" "}
              <span style={{ color: "var(--lp-ink)", fontWeight: 600, marginLeft: 3 }}>
                Tegucigalpa
              </span>
            </span>
            <span style={{ color: "var(--lp-line2)" }}>·</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Plane size={11} strokeWidth={2} />
              Bodega Miami activa
            </span>
            <div style={{ flex: 1 }} />
            <Link href="/shop/account" style={{ color: "var(--lp-ink3)", textDecoration: "none" }}>
              Mi cuenta
            </Link>
            <Link href="/shop/orders" style={{ color: "var(--lp-ink3)", textDecoration: "none" }}>
              Mis pedidos
            </Link>
            <a href="#como-funciona" style={{ color: "var(--lp-ink3)", textDecoration: "none" }}>
              Ayuda
            </a>
          </div>
        </div>

        {/* Main row */}
        <div
          className="lp-nav-main-row"
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            padding: "14px 36px",
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "-0.6px",
              color: "var(--lp-ink)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "baseline",
              flexShrink: 0,
            }}
          >
            CLICK<span style={{ color: "var(--lp-accent)", marginLeft: 1 }}>.</span>
          </Link>

          {/* Search bar — desktop only */}
          <form
            action="/shop/search"
            method="get"
            className="lp-search-full"
            style={{
              flex: 1,
              maxWidth: 720,
              height: 46,
              border: "2px solid var(--lp-ink)",
              borderRadius: 8,
              overflow: "hidden",
              background: "#FFF",
            }}
          >
            <button
              type="button"
              style={{
                padding: "0 14px",
                background: "var(--lp-paper2)",
                borderRight: "1px solid var(--lp-line)",
                fontFamily: "var(--font-geist-mono)",
                fontSize: 12,
                fontWeight: 500,
                color: "var(--lp-ink2)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                letterSpacing: "-0.1px",
                border: "none",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              Todas <ChevronDown size={12} strokeWidth={2} />
            </button>
            <input
              name="q"
              placeholder="¿Qué buscas? AirPods, Stanley, café Welchez…"
              style={{
                flex: 1,
                border: 0,
                outline: 0,
                fontSize: 14,
                color: "var(--lp-ink)",
                padding: "0 14px",
                background: "transparent",
                minWidth: 0,
                fontFamily: "var(--font-geist-sans)",
              }}
            />
            <button
              type="submit"
              style={{
                width: 56,
                background: "var(--lp-accent)",
                color: "#FFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <Search size={20} strokeWidth={2.2} />
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Account (desktop only) */}
            <Link
              href="/shop/account"
              className="lp-nav-account"
              style={{ flexDirection: "column", alignItems: "flex-start", textDecoration: "none" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 10.5,
                  color: "var(--lp-ink3)",
                  letterSpacing: "0.3px",
                }}
              >
                Hola, entra
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--lp-ink)",
                  letterSpacing: "-0.1px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                Cuenta <ChevronDown size={11} strokeWidth={2} />
              </span>
            </Link>

            <div className="lp-nav-divider" style={{ width: 1, height: 28, background: "var(--lp-line)" }} />

            {/* Search icon — mobile only */}
            <Link
              href="/shop/search"
              className="lp-search-icon"
              aria-label="Buscar"
              style={{ color: "var(--lp-ink)", alignItems: "center", justifyContent: "center" }}
            >
              <Search size={22} strokeWidth={1.8} />
            </Link>

            {/* Cart */}
            <Link
              href="/shop/cart"
              style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}
            >
              <ShoppingCart size={26} strokeWidth={1.7} style={{ color: "var(--lp-ink)" }} />
              <div
                className="lp-nav-cart-labels"
                style={{ textAlign: "left" }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 10.5,
                    color: "var(--lp-accent)",
                    fontWeight: 600,
                  }}
                >
                  Mi carrito
                </span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 12,
                    color: "var(--lp-ink)",
                    fontWeight: 600,
                    letterSpacing: "-0.2px",
                  }}
                >
                  Ver todo
                </span>
              </div>
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="lp-hamburger"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 6,
                color: "var(--lp-ink)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {menuOpen ? (
                <X size={22} strokeWidth={1.8} />
              ) : (
                <Menu size={22} strokeWidth={1.8} />
              )}
            </button>
          </div>
        </div>

        {/* Category sub-nav — desktop only */}
        <div className="lp-nav-cats" style={{ background: "var(--lp-ink)", color: "#FFF" }}>
          <div
            style={{
              maxWidth: 1360,
              margin: "0 auto",
              padding: "0 36px",
              display: "flex",
              alignItems: "center",
              overflowX: "auto",
            }}
          >
            <Link
              href="/shop/c"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 14px",
                fontSize: 13,
                fontWeight: 600,
                color: "#FFF",
                letterSpacing: "-0.1px",
                borderRight: "1px solid rgba(255,255,255,0.1)",
                textDecoration: "none",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <Menu size={16} strokeWidth={2} /> Todas las categorías
            </Link>
            {CATS.map((cat, i) => (
              <Link
                key={cat.label}
                href={`/shop/c/${encodeURIComponent(cat.slug)}`}
                style={{
                  padding: "11px 14px",
                  fontSize: 13,
                  fontWeight: 400,
                  color: i === 0 ? "#FFF" : "rgba(255,255,255,0.78)",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  flexShrink: 0,
                }}
              >
                {cat.label}
              </Link>
            ))}
            <div style={{ flex: 1 }} />
            <span
              style={{
                padding: "11px 14px",
                fontFamily: "var(--font-geist-mono)",
                fontSize: 11,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.3px",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--lp-accent)",
                  animation: "lp-pulse-dot 1.6s ease infinite",
                  display: "inline-block",
                }}
              />
              Bodega Miami · operando
            </span>
          </div>
        </div>
      </header>

      {/* Mobile drawer — shown only on small screens */}
      <div
        className="lp-mobile-drawer"
        style={{
          position: "fixed",
          top: 58,
          left: 0,
          right: 0,
          zIndex: 48,
          display: menuOpen ? undefined : "none",
        }}
      >
        <div
          style={{
            background: "var(--lp-surface)",
            borderBottom: "1px solid var(--lp-line)",
            padding: "16px 16px 24px",
          }}
        >
          {/* Mobile search */}
          <form
            action="/shop/search"
            method="get"
            style={{
              display: "flex",
              height: 44,
              border: "1px solid var(--lp-line2)",
              borderRadius: 8,
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            <input
              name="q"
              placeholder="Busca productos o pega un link…"
              style={{
                flex: 1,
                border: 0,
                outline: 0,
                fontSize: 14,
                color: "var(--lp-ink)",
                padding: "0 14px",
                background: "transparent",
              }}
            />
            <button
              type="submit"
              style={{
                width: 46,
                background: "var(--lp-accent)",
                color: "#FFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Search size={18} strokeWidth={2.2} />
            </button>
          </form>

          {/* Categories */}
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 10,
              color: "var(--lp-ink3)",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              marginBottom: 10,
            }}
          >
            Categorías
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}
          >
            {CATS.map((cat) => (
              <Link
                key={cat.label}
                href={`/shop/c/${encodeURIComponent(cat.slug)}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: "10px 14px",
                  background: "var(--lp-paper2)",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--lp-ink)",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Utility links */}
          <div
            style={{
              borderTop: "1px solid var(--lp-line)",
              paddingTop: 16,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <Link
              href="/shop/account"
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: 14,
                color: "var(--lp-ink)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Mi cuenta
            </Link>
            <Link
              href="/shop/orders"
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: 14,
                color: "var(--lp-ink)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Mis pedidos
            </Link>
            <span
              style={{
                fontSize: 13,
                color: "var(--lp-ink3)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Plane size={13} strokeWidth={1.7} />
              Bodega Miami activa
            </span>
          </div>
        </div>
        {/* Backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(7,26,42,0.4)",
            backdropFilter: "blur(2px)",
            zIndex: -1,
          }}
        />
      </div>
    </>
  );
}
