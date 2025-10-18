"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { FormProvider, useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { FormError } from "~/components/ui/form-error";
import { Input } from "~/components/ui/input";
import { useCreateTodoMutation } from "~/features/shared/api/mutations/useCreateTodoMutation";

import { useCategoriesQuery } from "~/features/shared/api/queries/useCategoriesQuery";

import { CategoryDropdown } from "~/features/shared/components/category-dropdown";

import {
  type TCreateTodoPayload,
  TodoPayload,
} from "~/features/shared/models/todo-models";

export const CreateTodoDialog = () => {
  useCategoriesQuery();

  const [open, setOpen] = useState(false);

  const { mutate, error: _error } = useCreateTodoMutation({
    onFinish: () => {
      setOpen(false);
      reset();
    },
  });

  const error = useMemo(() => {
    if (isAxiosError(_error)) {
      return _error.response?.data;
    }
  }, [_error]);

  const form = useForm<TCreateTodoPayload>({
    resolver: zodResolver(TodoPayload),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = (payload: TCreateTodoPayload) => mutate(payload);

  return (
    <FormProvider {...form}>
      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);

          if (value === false) {
            reset();
          }
        }}
      >
        <DialogTrigger asChild>
          <Button className="ml-auto">
            <Plus />
            Створити
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Створити завдання</DialogTitle>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <Input {...register("title")} placeholder="Назва завдання" />
            {errors.title && <FormError>{errors.title.message}</FormError>}
            <CategoryDropdown />
            <Button className="w-full" type="submit">
              Додати
            </Button>
            {error && (
              <FormError>
                {(error.code === "EXCEED_CATEGORY_COUNT" &&
                  "Занадто багато завдань на цю категорію") ??
                  "Невідома помилка"}
              </FormError>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};
