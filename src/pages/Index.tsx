import { useState, useCallback, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CampusMap from "@/components/CampusMap";
import MapControls from "@/components/MapControls";
import CategoryLegend from "@/components/CategoryLegend";
import NavigationBar from "@/components/NavigationBar";
import { Building, BuildingCategory } from "@/types/building";
import { useToast } from "@/hooks/use-toast";
import { useNavigation } from "@/hooks/useNavigation";

const Index = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<BuildingCategory | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([6.8545, 3.9125]);
  const [mapZoom, setMapZoom] = useState(16);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();
  const nav = useNavigation();

  const handleSelectBuilding = useCallback((building: Building) => {
    setSelectedBuilding(building);
    setMapCenter([building.latitude, building.longitude]);
    setMapZoom(18);
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
        () => {
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

  const handleStartNavigation = useCallback(
    (building: Building) => {
      nav.startNavigation(building);
      toast({
        title: "Navigation started",
        description: `Tracking your route to ${building.name}.`,
      });
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    },
    [nav, toast]
  );

  const handleStopNavigation = useCallback(() => {
    nav.stopNavigation();
    toast({ title: "Navigation stopped" });
  }, [nav, toast]);

  // Auto-center when navigation starts / position first arrives
  useEffect(() => {
    if (nav.isTracking && nav.position) {
      setMapCenter(nav.position);
      setMapZoom((z) => Math.max(z, 17));
    }
    // Only react to becoming tracked, not every position update
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nav.isTracking]);

  // Notify on arrival
  useEffect(() => {
    if (
      nav.isTracking &&
      nav.distanceToDestination !== null &&
      nav.distanceToDestination < 15
    ) {
      toast({
        title: "You have arrived 🎉",
        description: `Welcome to ${nav.destination?.name}.`,
      });
      nav.stopNavigation();
    }
  }, [nav.distanceToDestination, nav.isTracking, nav.destination, nav, toast]);

  const isNavigatingSelected =
    nav.isTracking && nav.destination?.id === selectedBuilding?.id;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      <Header
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={handleToggleSidebar}
        onSelectBuilding={handleSelectBuilding}
        onResetMap={handleResetMap}
      />

      {nav.isTracking && nav.destination && (
        <NavigationBar
          destination={nav.destination}
          speed={nav.speed}
          heading={nav.heading}
          distanceToDestination={nav.distanceToDestination}
          etaSeconds={nav.etaSeconds}
          error={nav.error}
          onStop={handleStopNavigation}
        />
      )}

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          selectedBuilding={selectedBuilding}
          selectedCategory={selectedCategory}
          onSelectBuilding={handleSelectBuilding}
          onSelectCategory={setSelectedCategory}
          onClearSelection={handleClearSelection}
          isNavigating={isNavigatingSelected}
          onStartNavigation={handleStartNavigation}
          onStopNavigation={handleStopNavigation}
        />

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
            userPosition={nav.position}
            userHeading={nav.heading}
            navDestination={nav.destination}
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
