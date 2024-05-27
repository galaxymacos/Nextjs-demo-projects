// hooks to communicate with get api at /api/transactions
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { client } from "@/lib/hono";

/**
 * @returns A query object to fetch accounts
 */
export const useGetTransactions = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    // * a query that handles caching, which endpoint to fetch
    queryKey: ["transactions", { from, to, accountId }], // TODO: check if params are needed
    queryFn: async () => {
      const response = await client.api.transactions.$get({
        // call hono api endpoints with query
        query: {
          from,
          to,
          accountId,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};