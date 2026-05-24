import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = { title: "Finalizar compra" };

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return <CheckoutForm />;
}
