"use client";

import { getStatusLabel } from "@/lib/order-status";
import type { OrderStatus } from "@prisma/client";

interface StatusEvent {
  status: string;
  message: string | null;
  at: string;
}

interface StatusTimelineProps {
  events: StatusEvent[];
}

function fmtTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("es-HN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-HN", {
    day: "numeric",
    month: "short",
  });
}

export function StatusTimeline({ events }: StatusTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="flex justify-center py-6">
        <p className="text-sm" style={{ color: "var(--cl-text-muted)" }}>
          Sin eventos de seguimiento aún
        </p>
      </div>
    );
  }

  // Show newest first
  const reversed = [...events].reverse();
  const latestStatus = events[events.length - 1].status as OrderStatus;

  return (
    <div className="flex flex-col">
      {reversed.map((event, i) => {
        const isCurrent = i === 0;
        const status = event.status as OrderStatus;

        return (
          <div
            key={`${event.status}-${event.at}`}
            className="flex gap-4"
            style={{
              animation: `grid-reveal 0.25s cubic-bezier(0.23,1,0.32,1) ${Math.min(i, 7) * 40}ms both`,
            }}
          >
            {/* Timeline spine */}
            <div className="flex flex-col items-center">
              <div
                className="mt-1 h-3 w-3 shrink-0 rounded-full transition-colors"
                style={{
                  background: isCurrent ? "var(--cl-accent)" : "var(--cl-surface-raised)",
                  border: `2px solid ${isCurrent ? "var(--cl-accent)" : "var(--cl-border)"}`,
                  boxShadow: isCurrent ? "0 0 0 3px var(--cl-accent-subtle)" : "none",
                }}
              />
              {i < reversed.length - 1 && (
                <div
                  className="mt-1 w-px flex-1"
                  style={{ background: "var(--cl-border)", minHeight: "28px" }}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-0.5 pb-5">
              <p
                className="text-sm font-medium leading-tight"
                style={{
                  color: isCurrent ? "var(--cl-text-primary)" : "var(--cl-text-secondary)",
                }}
              >
                {getStatusLabel(status)}
              </p>
              {event.message && (
                <p className="text-xs" style={{ color: "var(--cl-text-muted)" }}>
                  {event.message}
                </p>
              )}
              <p className="text-[10px]" style={{ color: "var(--cl-text-muted)" }}>
                {fmtDate(event.at)} · {fmtTime(event.at)}
              </p>
            </div>
          </div>
        );
      })}

      {/* Pending future steps */}
      {latestStatus !== "DELIVERED" && (
        <div className="flex gap-4 opacity-30">
          <div className="flex flex-col items-center">
            <div
              className="mt-1 h-3 w-3 shrink-0 rounded-full border-2"
              style={{ borderColor: "var(--cl-border)", background: "transparent" }}
            />
          </div>
          <p className="mt-0.5 text-sm" style={{ color: "var(--cl-text-muted)" }}>
            Próxima actualización en camino…
          </p>
        </div>
      )}
    </div>
  );
}
