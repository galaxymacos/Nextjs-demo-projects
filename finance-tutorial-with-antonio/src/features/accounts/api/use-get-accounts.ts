// hooks to communicate with api at /api/accounts
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetAccounts = () => {
  const query = useQuery({
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
