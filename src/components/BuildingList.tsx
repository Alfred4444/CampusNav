import { Building, BuildingCategory } from "@/types/building";
import { campusBuildings, getCategoryLabel, getCategoryColor } from "@/data/buildings";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Clock } from "lucide-react";

interface BuildingListProps {
  selectedCategory: BuildingCategory | null;
  selectedBuilding: Building | null;
  onSelectBuilding: (building: Building) => void;
  onSelectCategory: (category: BuildingCategory | null) => void;
}

const categories: BuildingCategory[] = ["academic", "residential", "food", "health", "recreation", "administrative", "sports"];

const getCategoryBadgeClass = (_category: BuildingCategory, isActive: boolean) => {
  if (!isActive) return "bg-muted text-muted-foreground hover:bg-muted/80 cursor-pointer";
  return "text-white cursor-pointer";
};

const getCategoryBadgeStyle = (category: BuildingCategory, isActive: boolean): React.CSSProperties =>
  isActive ? { backgroundColor: getCategoryColor(category), color: "white" } : {};

const BuildingList = ({
  selectedCategory,
  selectedBuilding,
  onSelectBuilding,
  onSelectCategory,
}: BuildingListProps) => {
  const filteredBuildings = selectedCategory
    ? campusBuildings.filter((b) => b.category === selectedCategory)
    : campusBuildings;

  const groupedBuildings = categories.reduce((acc, category) => {
    acc[category] = filteredBuildings.filter((b) => b.category === category);
    return acc;
  }, {} as Record<BuildingCategory, Building[]>);

  return (
    <div className="h-full flex flex-col">
      {/* Category Filters */}
      <div className="p-2 sm:p-4 border-b border-border">
        <p className="text-[10px] sm:text-xs text-muted-foreground mb-1.5 sm:mb-2 font-medium">Categories</p>
        <div className="flex flex-wrap gap-1 sm:gap-2">
          <Badge
            className={`cursor-pointer transition-all text-[10px] sm:text-xs px-1.5 sm:px-2.5 py-0.5 ${
              !selectedCategory
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
            onClick={() => onSelectCategory(null)}
          >
            All
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              className={`transition-all text-[10px] sm:text-xs px-1.5 sm:px-2.5 py-0.5 ${getCategoryBadgeClass(category, selectedCategory === category)}`}
              style={getCategoryBadgeStyle(category, selectedCategory === category)}
              onClick={() => onSelectCategory(selectedCategory === category ? null : category)}
            >
              {getCategoryLabel(category)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Building List */}
      <ScrollArea className="flex-1">
        <div className="p-2 sm:p-4 space-y-4 sm:space-y-6">
          {selectedCategory ? (
            <div className="space-y-1.5 sm:space-y-2">
              {filteredBuildings.map((building) => (
                <BuildingCard
                  key={building.id}
                  building={building}
                  isSelected={selectedBuilding?.id === building.id}
                  onClick={() => onSelectBuilding(building)}
                />
              ))}
            </div>
          ) : (
            categories.map((category) => {
              const categoryBuildings = groupedBuildings[category];
              if (categoryBuildings.length === 0) return null;

              return (
                <div key={category}>
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <div
                      className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                      style={{ backgroundColor: getCategoryColor(category) }}
                    />
                    <h3 className="font-semibold text-foreground text-xs sm:text-sm">
                      {getCategoryLabel(category)}
                    </h3>
                    <span className="text-[10px] sm:text-xs text-muted-foreground">
                      ({categoryBuildings.length})
                    </span>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    {categoryBuildings.map((building) => (
                      <BuildingCard
                        key={building.id}
                        building={building}
                        isSelected={selectedBuilding?.id === building.id}
                        onClick={() => onSelectBuilding(building)}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

interface BuildingCardProps {
  building: Building;
  isSelected: boolean;
  onClick: () => void;
}

const BuildingCard = ({ building, isSelected, onClick }: BuildingCardProps) => {
  return (
    <button
      className={`w-full p-2 sm:p-3 rounded-lg text-left transition-all duration-200 ${
        isSelected
          ? "bg-primary text-primary-foreground shadow-glow"
          : "bg-muted hover:bg-muted/80"
      }`}
      onClick={onClick}
    >
      <p className={`font-medium text-xs sm:text-sm ${isSelected ? "" : "text-foreground"}`}>
        {building.name}
      </p>
      <p
        className={`text-[10px] sm:text-xs mt-0.5 sm:mt-1 line-clamp-1 ${
          isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
        }`}
      >
        {building.description}
      </p>
      {building.openingHours && (
        <div className={`flex items-center gap-1 mt-1.5 sm:mt-2 text-[10px] sm:text-xs ${
          isSelected ? "text-primary-foreground/70" : "text-muted-foreground"
        }`}>
          <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          <span>{building.openingHours}</span>
        </div>
      )}
    </button>
  );
};

export default BuildingList;
