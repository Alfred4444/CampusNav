export interface Building {
  id: string;
  name: string;
  category:
    | "academic"
    | "residential"
    | "food"
    | "health"
    | "recreation"
    | "administrative"
    | "sports";
  latitude: number;
  longitude: number;
  description: string;
  facilities?: string[];
  openingHours?: string;
}

export type BuildingCategory = Building["category"];
