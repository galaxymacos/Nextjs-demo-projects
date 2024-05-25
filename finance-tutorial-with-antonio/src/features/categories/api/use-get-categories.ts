// hooks to communicate with api at /api/categories
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

/**
 * This hook is used in client side to return a query to get all categories
 * @returns A query to get all categories
 */
export const useGetCategories = () => {
  const query = useQuery({
    queryKey: ["categories"], // unique key to be revalidated by queryclient
    queryFn: async () => {
      const response = await client.api.categories.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
