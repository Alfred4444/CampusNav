import { Navigation, X, Gauge, Compass, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Building } from "@/types/building";
import { headingLabel } from "@/hooks/useNavigation";

interface NavigationBarProps {
  destination: Building;
  speed: number | null; // m/s
  heading: number | null;
  distanceToDestination: number | null;
  etaSeconds: number | null;
  error: string | null;
  onStop: () => void;
}

const formatDistance = (m: number | null) => {
  if (m === null) return "--";
  if (m < 1000) return `${Math.round(m)} m`;
  return `${(m / 1000).toFixed(2)} km`;
};

const formatEta = (s: number | null) => {
  if (s === null) return "--";
  if (s < 60) return `${Math.round(s)}s`;
  const mins = Math.round(s / 60);
  if (mins < 60) return `${mins} min`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
};

const NavigationBar = ({
  destination,
  speed,
  heading,
  distanceToDestination,
  etaSeconds,
  error,
  onStop,
}: NavigationBarProps) => {
  const speedKmh = speed !== null ? (speed * 3.6).toFixed(1) : "--";
  const headingText =
    heading !== null && !isNaN(heading)
      ? `${headingLabel(heading)} ${Math.round(heading)}°`
      : "--";

  return (
    <div className="bg-primary text-primary-foreground border-b border-border shadow-md animate-fade-up z-40">
      <div className="px-3 sm:px-4 py-2 flex items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-full bg-primary-foreground/15 flex items-center justify-center shrink-0 animate-pulse-soft">
            <Navigation className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs uppercase tracking-wider opacity-80 leading-none">
              Navigating to
            </p>
            <p className="font-semibold text-sm sm:text-base truncate leading-tight">
              {destination.name}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-5 text-sm shrink-0">
          <div className="flex items-center gap-1.5">
            <Gauge className="h-4 w-4 opacity-80" />
            <div className="leading-tight">
              <p className="text-[10px] uppercase opacity-70 leading-none">Speed</p>
              <p className="font-semibold">{speedKmh} km/h</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Compass className="h-4 w-4 opacity-80" />
            <div className="leading-tight">
              <p className="text-[10px] uppercase opacity-70 leading-none">Heading</p>
              <p className="font-semibold">{headingText}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 opacity-80" />
            <div className="leading-tight">
              <p className="text-[10px] uppercase opacity-70 leading-none">Distance</p>
              <p className="font-semibold">
                {formatDistance(distanceToDestination)}
                <span className="opacity-70 font-normal"> · {formatEta(etaSeconds)}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Mobile compact stats */}
        <div className="flex sm:hidden items-center gap-3 text-xs shrink-0">
          <span className="font-semibold">{speedKmh} km/h</span>
          <span className="opacity-80">{formatDistance(distanceToDestination)}</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onStop}
          className="h-8 w-8 shrink-0 hover:bg-primary-foreground/15 text-primary-foreground"
          aria-label="Stop navigation"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      {error && (
        <p className="px-4 pb-2 text-xs bg-destructive/20">⚠ {error}</p>
      )}
    </div>
  );
};

export default NavigationBar;
