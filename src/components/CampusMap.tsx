import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Building } from "@/types/building";
import { campusBuildings, getCategoryColor, getCategoryLabel } from "@/data/buildings";

interface CampusMapProps {
  center: [number, number];
  zoom: number;
  selectedBuilding: Building | null;
  onSelectBuilding: (building: Building) => void;
}

// Create custom marker icon
const createMarkerIcon = (category: Building["category"], isSelected: boolean) => {
  const color = getCategoryColor(category);
  const size = isSelected ? 44 : 36;
  const borderWidth = isSelected ? 4 : 3;
  
  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: 50%;
        border: ${borderWidth}px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        transform: ${isSelected ? 'scale(1.1)' : 'scale(1)'};
        transition: all 0.2s ease;
      ">
        <svg width="${size * 0.45}" height="${size * 0.45}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

const CampusMap = ({ center, zoom, selectedBuilding, onSelectBuilding }: CampusMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: center,
      zoom: zoom,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Add markers for all buildings
    campusBuildings.forEach((building) => {
      const marker = L.marker([building.latitude, building.longitude], {
        icon: createMarkerIcon(building.category, false),
      }).addTo(map);

      const popupContent = `
        <div class="p-4 min-w-[250px]">
          <div class="flex items-start justify-between gap-2 mb-3">
            <h3 class="font-semibold text-lg leading-tight">
              ${building.name}
            </h3>
            <span class="px-2 py-1 text-xs rounded-full bg-primary text-white shrink-0">
              ${getCategoryLabel(building.category)}
            </span>
          </div>
          <p class="text-sm text-gray-600 mb-3">
            ${building.description}
          </p>
          ${building.openingHours ? `
            <div class="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <span>🕐 ${building.openingHours}</span>
            </div>
          ` : ''}
          <button 
            class="w-full px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            onclick="window.selectBuilding('${building.id}')"
          >
            View Details →
          </button>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 300, className: "custom-popup" });
      marker.on("click", () => onSelectBuilding(building));
      markersRef.current.set(building.id, marker);
    });

    // Expose selectBuilding function globally for popup button
    (window as any).selectBuilding = (buildingId: string) => {
      const building = campusBuildings.find(b => b.id === buildingId);
      if (building) {
        onSelectBuilding(building);
      }
    };

    mapRef.current = map;

    return () => {
      delete (window as any).selectBuilding;
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
  }, []);

  // Update map view when center or zoom changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(center, zoom, { animate: true, duration: 0.5 });
    }
  }, [center, zoom]);

  // Update marker icons when selected building changes
  useEffect(() => {
    markersRef.current.forEach((marker, buildingId) => {
      const building = campusBuildings.find(b => b.id === buildingId);
      if (building) {
        const isSelected = selectedBuilding?.id === buildingId;
        marker.setIcon(createMarkerIcon(building.category, isSelected));
      }
    });
  }, [selectedBuilding]);

  return <div ref={containerRef} className="w-full h-full z-0" />;
};

export default CampusMap;
