import { parseAsArrayOf, parseAsInteger, useQueryState } from "nuqs";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useCategoriesQuery } from "~/features/shared/api/queries/useCategoriesQuery";

export const CategoryFilterDropdown = () => {
  const { data } = useCategoriesQuery();

  const [categories, setCategories] = useQueryState(
    "categories",
    parseAsArrayOf(parseAsInteger).withDefault([]),
  );

  const toggleCategory = (id: number) => {
    if (categories.includes(id)) {
      setCategories(categories.filter((c) => c !== id));
    } else {
      setCategories([...categories, id]);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Фільтри</Button>
      </DropdownMenuTrigger>
      {data && (
        <DropdownMenuContent>
          {data.map((item) => (
            <DropdownMenuCheckboxItem
              key={item.id}
              checked={categories.includes(item.id)}
              onCheckedChange={() => toggleCategory(item.id)}
            >
              {item.title}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};
