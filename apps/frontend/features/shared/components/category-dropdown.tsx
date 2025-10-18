"use client";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { FormError } from "~/components/ui/form-error";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useCategoriesQuery } from "~/features/shared/api/queries/useCategoriesQuery";
import type { TCreateTodoPayload } from "~/features/shared/models/todo-models";
import { cn } from "~/lib/utils";

export function CategoryDropdown() {
  const { data: categories } = useCategoriesQuery();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const {
    watch,
    setValue: _setValue,
    formState: { errors },
  } = useFormContext<TCreateTodoPayload>();

  const value = watch("category");

  const setValue = (value: TCreateTodoPayload["category"]) => {
    _setValue("category", value);
    setOpen(false);
  };

  if (!categories) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? (categories.find((option) => option.id === value.id)?.title ??
              value.title)
            : "Оберіть категорію..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      {errors.category && <FormError>{errors.category.message}</FormError>}
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            onValueChange={(search) => setSearch(search)}
            placeholder="Назва категорії..."
          />
          <CommandList>
            <CommandEmpty>
              <p>
                {categories.length === 0
                  ? "Створіть першу категорію"
                  : "Такої категорії не існує."}
              </p>
              <Button
                disabled={search.length < 3}
                onClick={() =>
                  setValue({
                    id: -1,
                    title: search,
                  })
                }
                className="mx-4"
                size="sm"
              >
                Створити
              </Button>
            </CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.id}
                  value={String(category.id)}
                  onSelect={() => setValue(category)}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value?.id === category.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {category.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
