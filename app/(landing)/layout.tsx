import { LandingNav } from "./_components/LandingNav";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="lp-root"
      style={{
        background: "var(--lp-paper)",
        color: "var(--lp-ink)",
        minHeight: "100dvh",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      <LandingNav />
      {children}
    </div>
  );
}
