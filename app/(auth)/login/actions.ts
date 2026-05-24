"use server";

import { signIn } from "@/lib/auth";
import { LoginSchema } from "@/lib/schemas/user";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function loginAction(
  _prev: { error: string },
  formData: FormData
): Promise<{ error: string }> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Correo o contraseña inválidos." };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/",
    });
    return { error: "" };
  } catch (err) {
    if (isRedirectError(err)) throw err;
    return { error: "Correo o contraseña incorrectos." };
  }
}
