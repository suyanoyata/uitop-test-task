import type { Request, Response } from "express";
import { CategoryService } from "~/services/category-service";

const categoryService = new CategoryService();

export const categoryController = {
  getCategories: async (_req: Request, res: Response) => {
    const categories = await categoryService.getAllCategories();

    res.status(200).json({ data: categories });
  },
};
