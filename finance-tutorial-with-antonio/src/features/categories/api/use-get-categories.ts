// hooks to communicate with api at /api/categories
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

/**
 * TODO: write comment
 * @returns
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
