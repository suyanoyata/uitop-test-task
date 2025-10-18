import { PrismaClient } from "~/lib/db";

export class CategoryService {
  private readonly db = new PrismaClient();

  public getAllCategories() {
    return this.db.category.findMany();
  }
}
