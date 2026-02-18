import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseNumberId(id: string) {
  const parsed = Number(id);
  if (isNaN(parsed)) return null;
  return parsed;
}
