// hooks to communicate with get api at /api/transactions
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { client } from "@/lib/hono";
import { convertAmountFromMiliunits } from "@/lib/utils";

/**
 * @returns A query object to fetch accounts
 */
export const useGetSummary = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    // * a query that handles caching, which endpoint to fetch
    queryKey: ["summary", { from, to, accountId }], // TODO: check if params are needed
    queryFn: async () => {
      const response = await client.api.summary.$get({
        // call hono api endpoints with query
        query: {
          from,
          to,
          accountId,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }
      const { data } = await response.json();
      return {
        ...data,
        expensesAmount: convertAmountFromMiliunits(data.expensesAmount),
        incomeAmount: convertAmountFromMiliunits(data.incomeAmount),
        remainingAmount: convertAmountFromMiliunits(data.remainingAmount),
        categories: data.categories.map((category) => ({
          ...category,
          value: convertAmountFromMiliunits(category.value),
        })),
        days: data.days.map((day) => ({
          ...day,
          income: convertAmountFromMiliunits(day.income),
          expenses: convertAmountFromMiliunits(day.expenses),
        })),
      };
    },
  });
  return query;
};
