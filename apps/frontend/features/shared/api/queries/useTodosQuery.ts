import { useQuery } from "@tanstack/react-query";

import { api } from "~/features/shared/lib/api";

import type { TApiResponse } from "~/features/shared/types/api";
import type { ITodo } from "~/features/shared/types/api/todo";

export const useTodosQuery = (categories?: number[]) => {
  return useQuery({
    queryKey: ["todos", categories],
    queryFn: async () => {
      const {
        data: { data },
      } = await api.get<TApiResponse<ITodo[]>>(`/todos?category=${categories}`);

      return data;
    },
  });
};
