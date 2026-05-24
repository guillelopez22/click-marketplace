"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart";
import { useLocationStore } from "@/stores/location";
import { checkoutAction } from "@/server/actions/checkout";
import { es } from "@/lib/i18n/es";

// Luhn validation — client-side only, card number is never sent to the server
function luhn(raw: string): boolean {
  const digits = raw.replace(/\D/g, "").split("").map(Number);
  if (digits.length < 13) return false;
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = digits[i];
    if (double) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
}

function fmtCard(v: string): string {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function fmtExpiry(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const city = useLocationStore((s) => s.city) ?? "TGU";
  const [isPending, startTransition] = useTransition();

  // Redirect to cart if empty
  useEffect(() => {
    if (items.length === 0) router.push("/cart");
  }, [items.length, router]);

  // Delivery fields — these ARE sent to the server
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Card fields — client-side ONLY, never sent to server
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardName, setCardName] = useState("");

  const [error, setError] = useState("");

  function validateCard(): string | null {
    const raw = cardNumber.replace(/\s/g, "");
    if (!luhn(raw)) return "Número de tarjeta inválido.";
    const parts = expiry.split("/");
    if (parts.length !== 2 || parts[0].length !== 2 || parts[1].length !== 2)
      return "Fecha de vencimiento inválida (MM/AA).";
    if (cvc.length < 3) return "CVC inválido.";
    if (!cardName.trim()) return "Ingresa el nombre que aparece en la tarjeta.";
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Validate card fields client-side — they are discarded after this point
    const cardErr = validateCard();
    if (cardErr) { setError(cardErr); return; }

    startTransition(async () => {
      // Only non-sensitive delivery fields reach the server
      const result = await checkoutAction({ input: { name, phone, address, city }, items });
      if ("error" in result) { setError(result.error); return; }
      clearCart();
      router.push(`/checkout/success/${result.orderId}`);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-4 pb-8">
      <h1
        className="text-xl font-bold"
        style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.025em" }}
      >
        {es.checkout.title}
      </h1>

      {/* Delivery */}
      <Section label={es.checkout.deliveryInfo}>
        <Field id="name" label={es.checkout.name} type="text"
          value={name} onChange={setName} placeholder="Juan Pérez" />
        <Field id="phone" label={es.checkout.phone} type="tel"
          value={phone} onChange={setPhone} placeholder="+504 9999-9999" />
        <Field id="address" label={es.checkout.address} type="text"
          value={address} onChange={setAddress} placeholder="Col. Kennedy, calle 2, casa 14" />
      </Section>

      {/* Payment */}
      <Section label={es.checkout.payment}>
        <div
          className="rounded-xl px-3 py-2.5 text-xs font-medium"
          style={{ background: "var(--cl-accent-subtle)", color: "var(--cl-accent)" }}
        >
          {es.checkout.demoNotice}
        </div>

        <div>
          <FieldLabel htmlFor="card">{es.checkout.cardNumber}</FieldLabel>
          <input
            id="card"
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            value={cardNumber}
            onChange={(e) => setCardNumber(fmtCard(e.target.value))}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className="w-full rounded-[10px] px-4 py-3 text-base outline-none"
            style={inputStyle}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel htmlFor="expiry">{es.checkout.expiry}</FieldLabel>
            <input
              id="expiry"
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              value={expiry}
              onChange={(e) => setExpiry(fmtExpiry(e.target.value))}
              placeholder="MM/AA"
              maxLength={5}
              className="w-full rounded-[10px] px-4 py-3 text-base outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <FieldLabel htmlFor="cvc">{es.checkout.cvc}</FieldLabel>
            <input
              id="cvc"
              type="text"
              inputMode="numeric"
              autoComplete="cc-csc"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="123"
              maxLength={4}
              className="w-full rounded-[10px] px-4 py-3 text-base outline-none"
              style={inputStyle}
            />
          </div>
        </div>

        <Field id="cardName" label={es.checkout.cardName} type="text"
          value={cardName} onChange={setCardName} placeholder="JUAN PEREZ" autoComplete="cc-name" />
      </Section>

      {error && (
        <div
          className="rounded-xl px-4 py-3 text-sm"
          style={{ background: "rgba(239,68,68,0.10)", color: "#EF4444" }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending || items.length === 0}
        className="flex h-12 w-full items-center justify-center rounded-2xl text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-40"
        style={{ background: "var(--cl-accent)" }}
      >
        {isPending ? es.checkout.processing : es.checkout.placeOrder}
      </button>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--cl-surface-raised)",
  border: "1px solid var(--cl-border)",
  color: "var(--cl-text-primary)",
};

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold" style={{ color: "var(--cl-text-primary)" }}>
        {label}
      </h2>
      <div
        className="flex flex-col gap-3 rounded-2xl p-4"
        style={{ background: "var(--cl-surface)", border: "1px solid var(--cl-border)" }}
      >
        {children}
      </div>
    </div>
  );
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-medium"
      style={{ color: "var(--cl-text-secondary)" }}
    >
      {children}
    </label>
  );
}

function Field({
  id, label, type, value, onChange, placeholder, autoComplete,
}: {
  id: string; label: string; type: string;
  value: string; onChange: (v: string) => void;
  placeholder: string; autoComplete?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        className="w-full rounded-[10px] px-4 py-3 text-base outline-none transition-all"
        style={inputStyle}
      />
    </div>
  );
}
