import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert the amount to integer to store in the database
 * @param amount
 * @returns
 */
export function convertAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000);
}

/**
 * Convert the integer amount in database (10000) to show to the user ($10.00)
 */
export function convertMiliunitsToAmount(miliunits: number) {
  return miliunits / 1000;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}
