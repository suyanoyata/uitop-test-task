import { useMutation } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";

import { toast } from "sonner";
import { api } from "~/features/shared/lib/api";

export const useChangeTodoStatusMutation = (
  setChecked: Dispatch<SetStateAction<boolean>>,
) => {
  return useMutation({
    mutationKey: ["change-todo-status"],
    mutationFn: async (id: number) => {
      setChecked((prev) => !prev);

      return await api.patch(`/todos/${id}`);
    },
    onMutate: (id, ctx) => {
      toast("Завдання відмічено як виконане", {
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
            setChecked((prev) => !prev);

            await api.patch(`/todos/${id}`);
          },
        },
      });
    },
  });
};
