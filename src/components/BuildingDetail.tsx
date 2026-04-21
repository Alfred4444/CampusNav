import { Clock, MapPin, ArrowLeft, Navigation, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building } from "@/types/building";
import { getCategoryLabel, getCategoryColor } from "@/data/buildings";

interface BuildingDetailProps {
  building: Building;
  onClose: () => void;
  isNavigating?: boolean;
  onStartNavigation?: (building: Building) => void;
  onStopNavigation?: () => void;
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

const BuildingDetail = ({
  building,
  onClose,
  isNavigating = false,
  onStartNavigation,
  onStopNavigation,
}: BuildingDetailProps) => {
  return (
    <div className="h-full flex flex-col bg-card animate-slide-in-left overflow-hidden">
      {/* Header */}
      <div className="p-2 sm:p-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          className="mb-2 sm:mb-3 -ml-1 sm:-ml-2 text-muted-foreground hover:text-foreground text-xs sm:text-sm h-7 sm:h-8"
          onClick={onClose}
        >
          <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          Back
        </Button>
        
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <h2 className="font-display font-bold text-base sm:text-xl text-foreground leading-tight">
            {building.name}
          </h2>
          <Badge className={`text-[10px] sm:text-xs shrink-0 ${getCategoryBadgeClass(building.category)}`}>
            {getCategoryLabel(building.category)}
          </Badge>
        </div>
      </div>

      {/* Navigate CTA */}
      {(onStartNavigation || onStopNavigation) && (
        <div className="px-2 sm:px-4 pt-2 sm:pt-3">
          {isNavigating ? (
            <Button
              variant="destructive"
              className="w-full"
              onClick={onStopNavigation}
            >
              <Square className="h-4 w-4 mr-2" />
              Stop Navigation
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={() => onStartNavigation?.(building)}
            >
              <Navigation className="h-4 w-4 mr-2" />
              Navigate Here
            </Button>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4 sm:space-y-6">
        {/* Description */}
        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-1 sm:mb-2">About</h3>
          <p className="text-muted-foreground text-xs sm:text-sm">{building.description}</p>
        </div>

        {/* Opening Hours */}
        {building.openingHours && (
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-muted rounded-lg">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-foreground">Opening Hours</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground truncate">{building.openingHours}</p>
            </div>
          </div>
        )}

        {/* Location */}
        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-muted rounded-lg">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-medium text-foreground">Coordinates</p>
            <p className="text-[10px] sm:text-sm text-muted-foreground truncate">
              {building.latitude.toFixed(4)}, {building.longitude.toFixed(4)}
            </p>
          </div>
        </div>

        {/* Facilities */}
        {building.facilities && building.facilities.length > 0 && (
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3">Facilities</h3>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {building.facilities.map((facility, index) => (
                <Badge key={index} variant="outline" className="bg-background text-[10px] sm:text-xs px-1.5 sm:px-2.5">
                  {facility}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Category Indicator */}
        <div
          className="p-2 sm:p-4 rounded-lg"
          style={{ backgroundColor: `${getCategoryColor(building.category)}15` }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shrink-0"
              style={{ backgroundColor: getCategoryColor(building.category) }}
            />
            <div>
              <p className="text-xs sm:text-sm font-medium text-foreground">
                {getCategoryLabel(building.category)}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
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
