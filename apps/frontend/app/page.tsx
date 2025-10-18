"use client";

import { Loader } from "lucide-react";

import { useTodosQuery } from "~/features/shared/api/queries/useTodosQuery";
import { CategoryFilterDropdown } from "~/features/shared/components/category-filter-dropdown";

import { CreateTodoDialog } from "~/features/shared/components/create-todo-dialog";
import { TodosList } from "~/features/shared/ui/todos-list";

export default function Home() {
  const { isPending } = useTodosQuery();

  if (isPending) {
    return (
      <main className="absolute h-screen w-full flex items-center justify-center">
        <Loader className="animate-spin size-4 opacity-50" />
      </main>
    );
  }

  return (
    <main className="max-w-3xl w-full mx-auto flex-1 flex flex-col px-2">
      <header className="flex py-2 items-center">
        <CategoryFilterDropdown />
        <CreateTodoDialog />
      </header>
      <TodosList />
    </main>
  );
}
