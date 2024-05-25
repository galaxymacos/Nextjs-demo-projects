// hooks to communicate with api at /api/accounts
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

/**
 *
 * @returns A query object to fetch accounts
 */
export const useGetAccounts = () => {
  const query = useQuery({
    // * a query that handles caching, which endpoint to fetch
    queryKey: ["accounts"], // unique key to be revalidated by queryclient
    queryFn: async () => {
      const response = await client.api.accounts.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch accounts");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
