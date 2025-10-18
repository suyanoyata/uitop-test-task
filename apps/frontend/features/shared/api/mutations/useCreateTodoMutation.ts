import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { api } from "~/features/shared/lib/api";
import type { TCreateTodoPayload } from "~/features/shared/models/todo-models";

export const useCreateTodoMutation = ({
  onFinish,
}: {
  onFinish: () => void;
}) => {
  return useMutation({
    mutationKey: ["create-todo"],
    mutationFn: async (data: TCreateTodoPayload) => {
      return await api.post("/todos", data);
    },
    onSuccess: (_response, _payload, _, ctx) => {
      ctx.client.resetQueries({
        queryKey: ["todos"],
      });

      onFinish();
    },
  });
};
