"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { advanceOrderAction } from "@/server/actions/admin";

export function AdvanceButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await advanceOrderAction(orderId);
      router.refresh();
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-all active:scale-95 disabled:opacity-50"
      style={{ background: "var(--cl-accent)" }}
    >
      {isPending ? "…" : "Avanzar"}
    </button>
  );
}
