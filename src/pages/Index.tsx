import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CampusMap from "@/components/CampusMap";
import MapControls from "@/components/MapControls";
import CategoryLegend from "@/components/CategoryLegend";
import { Building, BuildingCategory } from "@/types/building";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<BuildingCategory | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([6.8545, 3.9125]);
  const [mapZoom, setMapZoom] = useState(16);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();

  const handleSelectBuilding = useCallback((building: Building) => {
    setSelectedBuilding(building);
    setMapCenter([building.latitude, building.longitude]);
    setMapZoom(18);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedBuilding(null);
  }, []);

  const handleResetMap = useCallback(() => {
    setSelectedBuilding(null);
    setSelectedCategory(null);
    setMapCenter([6.8545, 3.9125]);
    setMapZoom(16);
  }, []);

  const handleZoomIn = useCallback(() => {
    setMapZoom((prev) => Math.min(prev + 1, 20));
  }, []);

  const handleZoomOut = useCallback(() => {
    setMapZoom((prev) => Math.max(prev - 1, 10));
  }, []);

  const handleLocate = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude]);
          setMapZoom(18);
          toast({
            title: "Location found",
            description: "Map centered on your current location.",
          });
        },
        (error) => {
          toast({
            title: "Location access denied",
            description: "Please enable location services to use this feature.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      <Header
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={handleToggleSidebar}
        onSelectBuilding={handleSelectBuilding}
        onResetMap={handleResetMap}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          selectedBuilding={selectedBuilding}
          selectedCategory={selectedCategory}
          onSelectBuilding={handleSelectBuilding}
          onSelectCategory={setSelectedCategory}
          onClearSelection={handleClearSelection}
        />

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-foreground/20 z-30 lg:hidden"
            onClick={handleToggleSidebar}
          />
        )}

        <main className="flex-1 relative">
          <CampusMap
            center={mapCenter}
            zoom={mapZoom}
            selectedBuilding={selectedBuilding}
            onSelectBuilding={handleSelectBuilding}
          />

          <MapControls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onLocate={handleLocate}
          />

          <CategoryLegend
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
