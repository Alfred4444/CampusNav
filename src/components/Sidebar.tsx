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
  isNavigating?: boolean;
  onStartNavigation?: (building: Building) => void;
  onStopNavigation?: () => void;
}

const Sidebar = ({
  isOpen,
  selectedBuilding,
  selectedCategory,
  onSelectBuilding,
  onSelectCategory,
  onClearSelection,
  isNavigating,
  onStartNavigation,
  onStopNavigation,
}: SidebarProps) => {
  return (
    <aside
      className={`
        fixed lg:relative inset-y-0 left-0 z-40
        w-[calc(100vw-40px)] max-w-80 sm:w-80 lg:w-96 bg-card border-r border-border
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        pt-14 sm:pt-16 lg:pt-0
      `}
    >
      <div className="h-full overflow-hidden">
        {selectedBuilding ? (
          <BuildingDetail
            building={selectedBuilding}
            onClose={onClearSelection}
            isNavigating={isNavigating && onStartNavigation !== undefined}
            onStartNavigation={onStartNavigation}
            onStopNavigation={onStopNavigation}
          />
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
