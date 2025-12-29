import { Building, BuildingCategory } from "@/types/building";
import BuildingList from "@/components/BuildingList";
import BuildingDetail from "@/components/BuildingDetail";

interface SidebarProps {
  isOpen: boolean;
  selectedBuilding: Building | null;
  selectedCategory: BuildingCategory | null;
  onSelectBuilding: (building: Building) => void;
  onSelectCategory: (category: BuildingCategory | null) => void;
  onClearSelection: () => void;
}

const Sidebar = ({
  isOpen,
  selectedBuilding,
  selectedCategory,
  onSelectBuilding,
  onSelectCategory,
  onClearSelection,
}: SidebarProps) => {
  return (
    <aside
      className={`
        fixed lg:relative inset-y-0 left-0 z-40
        w-80 lg:w-96 bg-card border-r border-border
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        pt-16 lg:pt-0
      `}
    >
      <div className="h-full">
        {selectedBuilding ? (
          <BuildingDetail building={selectedBuilding} onClose={onClearSelection} />
        ) : (
          <BuildingList
            selectedCategory={selectedCategory}
            selectedBuilding={selectedBuilding}
            onSelectBuilding={onSelectBuilding}
            onSelectCategory={onSelectCategory}
          />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
