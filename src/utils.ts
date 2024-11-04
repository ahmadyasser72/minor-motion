import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { DateFormatter } from "@internationalized/date";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const allHari = [
  "senin",
  "selasa",
  "rabu",
  "kamis",
  "jum'at",
  "sabtu",
  "minggu",
] as const;

const formatter = new DateFormatter("id-ID", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  hour12: true,
  minute: "2-digit",
});
export const formatDate = (date: Date) => formatter.format(date);

/** ChatGPT snip */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => func(...args), delay);
  };
}
