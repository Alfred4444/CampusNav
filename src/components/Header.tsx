import { Menu, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import { Building } from "@/types/building";

interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onSelectBuilding: (building: Building) => void;
  onResetMap: () => void;
}

const Header = ({ isSidebarOpen, onToggleSidebar, onSelectBuilding, onResetMap }: HeaderProps) => {
  return (
    <header className="h-14 sm:h-16 bg-card/95 backdrop-blur-sm border-b border-border px-2 sm:px-4 flex items-center gap-2 sm:gap-4 z-50">
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 lg:hidden h-8 w-8 sm:h-10 sm:w-10"
        onClick={onToggleSidebar}
      >
        {isSidebarOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
      </Button>

      <button 
        className="flex items-center gap-1.5 sm:gap-2 shrink-0"
        onClick={onResetMap}
      >
        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-primary flex items-center justify-center">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
        </div>
        <div className="hidden xs:block sm:block">
          <h1 className="font-display font-bold text-sm sm:text-lg text-foreground leading-none">
            CampusNav
          </h1>
          <p className="text-[10px] sm:text-xs text-muted-foreground">University Navigator</p>
        </div>
      </button>

      <div className="flex-1 flex justify-center min-w-0">
        <SearchBar onSelectBuilding={onSelectBuilding} />
      </div>

      <div className="shrink-0 w-0 sm:w-9 lg:w-auto" />
    </header>
  );
};

export default Header;
