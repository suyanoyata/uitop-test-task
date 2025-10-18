import { useQuery } from "@tanstack/react-query";
import { api } from "~/features/shared/lib/api";

import type { TApiResponse } from "~/features/shared/types/api";
import type { TCategory } from "~/features/shared/types/api/category";

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const {
        data: { data },
      } = await api.get<TApiResponse<TCategory[]>>("/categories");

      return data;
    },
  });
};
