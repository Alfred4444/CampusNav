import { Building, BuildingCategory } from "@/types/building";
import { Badge } from "@/components/ui/badge";
import { getCategoryLabel, getCategoryColor } from "@/data/buildings";

interface CategoryLegendProps {
  selectedCategory: BuildingCategory | null;
  onSelectCategory: (category: BuildingCategory | null) => void;
}

const categories: BuildingCategory[] = ["faculty", "department", "hostel", "admin", "facility"];

const CategoryLegend = ({ selectedCategory, onSelectCategory }: CategoryLegendProps) => {
  return (
    <div className="absolute bottom-6 left-6 z-[1000] bg-card/95 backdrop-blur-sm rounded-lg shadow-lg border border-border p-3">
      <p className="text-xs font-medium text-muted-foreground mb-2">Legend</p>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-all ${
              selectedCategory === category
                ? "ring-2 ring-offset-2 ring-primary"
                : "hover:opacity-80"
            }`}
            style={{
              backgroundColor: getCategoryColor(category),
              color: "white",
            }}
            onClick={() => onSelectCategory(selectedCategory === category ? null : category)}
          >
            {getCategoryLabel(category)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryLegend;
