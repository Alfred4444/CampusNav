import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Building } from "@/types/building";
import { campusBuildings, getCategoryColor, getCategoryLabel } from "@/data/buildings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowRight } from "lucide-react";

interface CampusMapProps {
  center: [number, number];
  zoom: number;
  selectedBuilding: Building | null;
  onSelectBuilding: (building: Building) => void;
}

// Component to handle map view changes
const MapController = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 0.5 });
  }, [center, zoom, map]);
  
  return null;
};

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

const getCategoryBadgeClass = (category: Building["category"]) => {
  const classes: Record<Building["category"], string> = {
    faculty: "bg-primary text-primary-foreground",
    department: "bg-secondary text-secondary-foreground",
    hostel: "bg-category-hostel text-primary-foreground",
    admin: "bg-category-admin text-primary-foreground",
    facility: "bg-category-facility text-primary-foreground",
  };
  return classes[category];
};

const CampusMap = ({ center, zoom, selectedBuilding, onSelectBuilding }: CampusMapProps) => {
  const mapRef = useRef<L.Map>(null);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="w-full h-full z-0"
      ref={mapRef}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapController center={center} zoom={zoom} />
      
      {campusBuildings.map((building) => (
        <Marker
          key={building.id}
          position={[building.latitude, building.longitude]}
          icon={createMarkerIcon(building.category, selectedBuilding?.id === building.id)}
          eventHandlers={{
            click: () => onSelectBuilding(building),
          }}
        >
          <Popup className="custom-popup" maxWidth={300}>
            <div className="p-4 min-w-[250px]">
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-display font-semibold text-foreground text-lg leading-tight">
                  {building.name}
                </h3>
                <Badge className={`${getCategoryBadgeClass(building.category)} text-xs shrink-0`}>
                  {getCategoryLabel(building.category)}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {building.description}
              </p>
              
              {building.openingHours && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Clock className="h-4 w-4" />
                  <span>{building.openingHours}</span>
                </div>
              )}
              
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => onSelectBuilding(building)}
              >
                View Details
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CampusMap;
