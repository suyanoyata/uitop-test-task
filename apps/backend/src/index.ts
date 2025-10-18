import bodyParser from "body-parser";
import cors from "cors";

import express, { json } from "express";

import { categoryController } from "~/controllers/category-controller";
import { todoContoller } from "~/controllers/todo-controller";

import { validateData } from "~/middlewares/body-validation";

import { TodoPayload } from "~/models/todo-models";

const app = express();

app.use(
  cors({
    methods: ["GET", "POST", "PATCH", "DELETE"],
    origin: "http://local.io",
  }),
);

app.use(json());
app.use(bodyParser.json());

app.post("/todos", validateData(TodoPayload), todoContoller.createTodo);

app.get("/todos", todoContoller.getAllTodos);

app.patch("/todos/:id", todoContoller.toggleTodoStatus);

app.delete("/todos/:id", todoContoller.deleteTodo);

app.get("/categories", categoryController.getCategories);

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`api listening on http://localhost:${process.env.EXPRESS_PORT}`);
});
