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
export function debounce<T extends (...args: any[]) => Promise<any>>(
  func: T,
  delay: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let promise: Promise<ReturnType<T>> | undefined;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    // Clear the previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Create a new promise for the debounced call
    promise = new Promise((resolve) => {
      timeoutId = setTimeout(async () => {
        const result = await func(...args); // Wait for the async function to complete
        resolve(result); // Resolve with the result of the function
      }, delay);
    });

    // Return the debounced promise
    return promise;
  };
}
