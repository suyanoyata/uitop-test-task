import type { Request, Response } from "express";
import type { TCreateTodoPayload } from "~/models/todo-models";
import { TodoService } from "~/services/todo-service";

const todoService = new TodoService();

export const todoContoller = {
  createTodo: async (
    req: Request<unknown, unknown, TCreateTodoPayload>,
    res: Response,
  ) => {
    try {
      const todo = await todoService.createTodo(req.body);

      res.status(200).json({ data: todo });
    } catch (e) {
      res.status(400).json(e);
    }
  },
  getAllTodos: async (
    req: Request<unknown, unknown, unknown, { category?: string }>,
    res: Response,
  ) => {
    if (req.query.category?.length === 0) {
      const todos = await todoService.getAllTodos();

      return res.status(200).json({ data: todos });
    }

    const nums = req.query.category
      ?.split(",")
      .map((n) => Number(n))
      .filter((n) => Number.isInteger(n));

    const todos = await todoService.getAllTodos(nums);

    res.status(200).json({ data: todos });
  },
  deleteTodo: async (req: Request<{ id: string }>, res: Response) => {
    const id = Number(req.params.id);

    await todoService.deleteTodo(id);

    res.status(200).json({
      data: {
        message: "Deleted",
      },
    });
  },
  toggleTodoStatus: async (req: Request<{ id: string }>, res: Response) => {
    const data = await todoService.toggleTodoStatus(Number(req.params.id));

    res.status(200).send({ data });
  },
};
