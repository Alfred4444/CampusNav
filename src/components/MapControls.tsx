import { ZoomIn, ZoomOut, Locate, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLocate: () => void;
}

const MapControls = ({ onZoomIn, onZoomOut, onLocate }: MapControlsProps) => {
  return (
    <div className="absolute bottom-6 right-6 z-[1000] flex flex-col gap-2">
      <div className="flex flex-col bg-card rounded-lg shadow-lg border border-border overflow-hidden">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none h-10 w-10 hover:bg-muted"
              onClick={onZoomIn}
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Zoom In</TooltipContent>
        </Tooltip>
        
        <div className="h-px bg-border" />
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none h-10 w-10 hover:bg-muted"
              onClick={onZoomOut}
            >
              <ZoomOut className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Zoom Out</TooltipContent>
        </Tooltip>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 bg-card shadow-lg border border-border hover:bg-muted"
            onClick={onLocate}
          >
            <Locate className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">My Location</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default MapControls;
