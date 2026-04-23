import { Building, BuildingCategory } from "@/types/building";
import { campusBuildings } from "@/data/buildings";

export const searchBuildings = (query: string, category?: BuildingCategory): Building[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  return campusBuildings.filter((building) => {
    const matchesQuery = 
      !normalizedQuery ||
      building.name.toLowerCase().includes(normalizedQuery) ||
      building.description.toLowerCase().includes(normalizedQuery) ||
      building.category.toLowerCase().includes(normalizedQuery) ||
      building.facilities?.some(f => f.toLowerCase().includes(normalizedQuery));
    
    const matchesCategory = !category || building.category === category;
    
    return matchesQuery && matchesCategory;
  });
};

export const getBuildingById = (id: string): Building | undefined => {
  return campusBuildings.find(building => building.id === id);
};

export const getBuildingsByCategory = (category: BuildingCategory): Building[] => {
  return campusBuildings.filter(building => building.category === category);
};

export const getAllCategories = (): BuildingCategory[] => {
  return ["academic", "residential", "food", "health", "recreation", "administrative", "sports"];
};
