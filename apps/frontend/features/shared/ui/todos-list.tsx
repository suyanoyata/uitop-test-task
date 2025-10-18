import { parseAsArrayOf, parseAsInteger, useQueryState } from "nuqs";
import { useTodosQuery } from "~/features/shared/api/queries/useTodosQuery";
import { TodoItem } from "~/features/shared/components/todo-item";

export const TodosList = () => {
  const [categories] = useQueryState(
    "categories",
    parseAsArrayOf(parseAsInteger).withDefault([]),
  );

  const { data: todos, error } = useTodosQuery(categories);

  if (error) {
    return (
      <div className="flex items-center justify-center flex-1 text-sm">
        <p>Не вдалось відобразити завдання</p>
      </div>
    );
  }

  if (!todos || todos?.length === 0) {
    return (
      <p className="flex items-center justify-center flex-1 text-sm">
        У вас ще немає завдань
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} item={todo} />
      ))}
    </div>
  );
};
