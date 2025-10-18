import { Errors } from "~/const/errors";
import { type Category, PrismaClient, type Task } from "~/lib/db";
import type { TCreateTodoPayload } from "~/models/todo-models";

const allowedCategoryCount = 5;

export class TodoService {
  private readonly db = new PrismaClient();

  public getAllTodos(categories?: Category["id"][]) {
    return this.db.task.findMany({
      where: {
        completed: false,
        deletedAt: null,
        category: {
          is: {
            id: {
              in: categories,
            },
          },
        },
      },
      include: {
        category: true,
      },
      omit: {
        categoryId: true,
      },
    });
  }

  public async createTodo(payload: TCreateTodoPayload) {
    const sameCategoryTodosCount = await this.db.task.count({
      where: {
        deletedAt: null,
        category: {
          id: payload.category.id,
        },
      },
    });

    if (sameCategoryTodosCount >= allowedCategoryCount) {
      throw {
        code: Errors.EXCEED_CATEGORY_COUNT,
        error: `Can't add more than ${allowedCategoryCount} todos in this category`,
      };
    }

    return this.db.task.create({
      data: {
        title: payload.title,
        category: {
          connectOrCreate: {
            create: { title: payload.category.title },
            where: {
              id: payload.category.id,
            },
          },
        },
      },
    });
  }

  public async deleteTodo(id: Task["id"]) {
    const task = await this.db.task.findFirst({
      where: {
        id,
      },
    });

    if (task?.deletedAt != null) {
      return this.db.task.update({
        where: {
          id,
        },
        data: {
          deletedAt: null,
        },
      });
    }

    return this.db.task.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  public async toggleTodoStatus(id: Task["id"]) {
    const item = await this.db.task.findFirst({
      where: {
        id,
      },
    });

    return this.db.task.update({
      where: {
        id,
      },
      data: {
        completed: !item?.completed,
      },
    });
  }
}
