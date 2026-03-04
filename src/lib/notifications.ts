"use client";

export async function solicitarPermisoNotificaciones(): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const permiso = await Notification.requestPermission();
  return permiso === "granted";
}

export function enviarNotificacion(titulo: string, cuerpo: string) {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  new Notification(titulo, {
    body: cuerpo,
    icon: "/favicon.ico",
    badge: "/favicon.ico",
  });
}

export function getPermisoNotificaciones(): string {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
  return Notification.permission;
}
