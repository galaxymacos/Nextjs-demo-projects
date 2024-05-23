import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

/**
 * query to get an category by id
 * @param id the category id to get
 * @returns
 */
export const useGetCategory = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["category", { id }],
    queryFn: async () => {
      const response = await client.api.categories[":id"].$get({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch category");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
