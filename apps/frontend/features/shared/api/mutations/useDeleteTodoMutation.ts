import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { api } from "~/features/shared/lib/api";
import type { TApiResponse } from "~/features/shared/types/api";

export const useDeleteTodoMutation = () => {
  return useMutation({
    mutationKey: ["delete-todo"],
    mutationFn: async (id: number) => {
      const {
        data: { data },
      } = await api.delete<TApiResponse<{ message: string }>>(`/todos/${id}`);

      return data;
    },
    onMutate: (id, ctx) => {
      toast("Завдання видалено", {
        position: "top-center",
        duration: 5000,
        onAutoClose: () =>
          ctx.client.invalidateQueries({
            queryKey: ["todos"],
          }),
        onDismiss: () =>
          ctx.client.invalidateQueries({
            queryKey: ["todos"],
          }),
        action: {
          label: "Відмінити",
          onClick: async () => {
            await api.delete(`/todos/${id}`);
          },
        },
      });
    },
  });
};
