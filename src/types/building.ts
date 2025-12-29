export interface Building {
  id: string;
  name: string;
  category: "faculty" | "department" | "hostel" | "admin" | "facility";
  latitude: number;
  longitude: number;
  description: string;
  facilities?: string[];
  openingHours?: string;
}

export type BuildingCategory = Building["category"];
