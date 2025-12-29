import { X, Clock, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building } from "@/types/building";
import { getCategoryLabel, getCategoryColor } from "@/data/buildings";

interface BuildingDetailProps {
  building: Building;
  onClose: () => void;
}

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

const BuildingDetail = ({ building, onClose }: BuildingDetailProps) => {
  return (
    <div className="h-full flex flex-col bg-card animate-slide-in-left">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          className="mb-3 -ml-2 text-muted-foreground hover:text-foreground"
          onClick={onClose}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all buildings
        </Button>
        
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display font-bold text-xl text-foreground leading-tight">
            {building.name}
          </h2>
          <Badge className={getCategoryBadgeClass(building.category)}>
            {getCategoryLabel(building.category)}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Description */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">About</h3>
          <p className="text-muted-foreground">{building.description}</p>
        </div>

        {/* Opening Hours */}
        {building.openingHours && (
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Opening Hours</p>
              <p className="text-sm text-muted-foreground">{building.openingHours}</p>
            </div>
          </div>
        )}

        {/* Location */}
        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Coordinates</p>
            <p className="text-sm text-muted-foreground">
              {building.latitude.toFixed(6)}, {building.longitude.toFixed(6)}
            </p>
          </div>
        </div>

        {/* Facilities */}
        {building.facilities && building.facilities.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Facilities</h3>
            <div className="flex flex-wrap gap-2">
              {building.facilities.map((facility, index) => (
                <Badge key={index} variant="outline" className="bg-background">
                  {facility}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Category Indicator */}
        <div
          className="p-4 rounded-lg"
          style={{ backgroundColor: `${getCategoryColor(building.category)}15` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: getCategoryColor(building.category) }}
            />
            <div>
              <p className="text-sm font-medium text-foreground">
                {getCategoryLabel(building.category)}
              </p>
              <p className="text-xs text-muted-foreground">
                Building Category
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingDetail;
