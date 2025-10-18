import z from "zod";

export const TodoPayload = z.object({
  title: z
    .string()
    .min(1, "Вкажіть назву завдання")
    .min(3, "Назва занадто коротка"),
  category: z.object(
    {
      id: z.number(),
      title: z.string().min(3, "Значення занадто коротке"),
    },
    {
      message: "Вкажіть категорію",
    },
  ),
});

export type TCreateTodoPayload = z.infer<typeof TodoPayload>;
export type TPatchTodoPayload = z.infer<typeof TodoPayload>;
