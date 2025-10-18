import z from "zod";
import { Errors } from "~/const/errors";

export const TodoPayload = z.object({
  title: z.string("Todo title is required").min(3, Errors.TOO_SHORT),
  category: z.object({
    id: z.number(),
    title: z.string("Category title is required").min(3, Errors.TOO_SHORT),
  }),
});

export type TCreateTodoPayload = z.infer<typeof TodoPayload>;
