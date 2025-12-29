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
    <header className="h-16 bg-card/95 backdrop-blur-sm border-b border-border px-4 flex items-center gap-4 z-50">
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 lg:hidden"
        onClick={onToggleSidebar}
      >
        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <button 
        className="flex items-center gap-2 shrink-0"
        onClick={onResetMap}
      >
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
          <MapPin className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="hidden sm:block">
          <h1 className="font-display font-bold text-lg text-foreground leading-none">
            CampusNav
          </h1>
          <p className="text-xs text-muted-foreground">University Navigator</p>
        </div>
      </button>

      <div className="flex-1 flex justify-center">
        <SearchBar onSelectBuilding={onSelectBuilding} />
      </div>

      <div className="shrink-0 w-9 lg:w-auto" />
    </header>
  );
};

export default Header;
