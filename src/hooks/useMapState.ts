import { useState, useCallback } from "react";
import { Building } from "@/types/building";

export const useMapState = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([6.8545, 3.9125]);
  const [mapZoom, setMapZoom] = useState(16);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const selectBuilding = useCallback((building: Building | null) => {
    setSelectedBuilding(building);
    if (building) {
      setMapCenter([building.latitude, building.longitude]);
      setMapZoom(18);
    }
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const resetMap = useCallback(() => {
    setSelectedBuilding(null);
    setMapCenter([6.8545, 3.9125]);
    setMapZoom(16);
  }, []);

  return {
    selectedBuilding,
    mapCenter,
    mapZoom,
    isSidebarOpen,
    selectBuilding,
    toggleSidebar,
    resetMap,
    setMapCenter,
    setMapZoom,
  };
};
