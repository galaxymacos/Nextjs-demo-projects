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
 * The amount to show to the user
 */
export function convertMiliunitsToAmount(miliunits: number) {
  return miliunits / 1000;
}
