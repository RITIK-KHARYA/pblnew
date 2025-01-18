import { Button } from "@/components/ui/button";

interface CategoryFiltersProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryFilters({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFiltersProps) {
  return (
    <div className="flex justify-center gap-4 flex-wrap mb-8">
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() =>
            onSelectCategory(category === selectedCategory ? null : category)
          }
          variant={category === selectedCategory ? "default" : "outline"}
          className="rounded-full"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
