import { Ellipsis, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { useChangeTodoStatusMutation } from "~/features/shared/api/mutations/useChangeTodoStatusMutation";
import { useDeleteTodoMutation } from "~/features/shared/api/mutations/useDeleteTodoMutation";

import type { ITodo } from "~/features/shared/types/api/todo";

export const TodoItem = ({ item }: { item: ITodo }) => {
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  const [checked, setChecked] = useState(false);

  const { mutate: changeTodoStatus } = useChangeTodoStatusMutation(setChecked);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Checkbox
          checked={checked}
          onCheckedChange={() => changeTodoStatus(item.id)}
        />
        <p>{item.title}</p>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-sm text-zinc-600 font-medium">
          {item.category.title}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => deleteTodo(item.id)}
              className="text-red-400 focus:text-red-400 focus-visible:text-red-400"
            >
              <Trash2 className="text-red-400" />
              Видалити
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
