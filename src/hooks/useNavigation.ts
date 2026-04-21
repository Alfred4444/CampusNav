import { useEffect, useRef, useState, useCallback } from "react";
import { Building } from "@/types/building";

export interface NavigationState {
  isTracking: boolean;
  destination: Building | null;
  position: [number, number] | null;
  speed: number | null; // m/s
  heading: number | null; // degrees from north
  distanceToDestination: number | null; // meters
  etaSeconds: number | null;
  error: string | null;
}

// Haversine distance in meters
const haversine = (a: [number, number], b: [number, number]) => {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(x));
};

const headingLabel = (deg: number) => {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
};

export const useNavigation = () => {
  const [state, setState] = useState<NavigationState>({
    isTracking: false,
    destination: null,
    position: null,
    speed: null,
    heading: null,
    distanceToDestination: null,
    etaSeconds: null,
    error: null,
  });
  const watchIdRef = useRef<number | null>(null);
  const destRef = useRef<Building | null>(null);

  const stopNavigation = useCallback(() => {
    if (watchIdRef.current !== null && "geolocation" in navigator) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    destRef.current = null;
    setState({
      isTracking: false,
      destination: null,
      position: null,
      speed: null,
      heading: null,
      distanceToDestination: null,
      etaSeconds: null,
      error: null,
    });
  }, []);

  const startNavigation = useCallback((destination: Building) => {
    if (!("geolocation" in navigator)) {
      setState((s) => ({ ...s, error: "Geolocation not supported" }));
      return;
    }
    destRef.current = destination;
    setState((s) => ({
      ...s,
      isTracking: true,
      destination,
      error: null,
    }));

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const dest = destRef.current;
        const position: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        const speed = pos.coords.speed; // m/s
        const heading = pos.coords.heading;
        const dist = dest
          ? haversine(position, [dest.latitude, dest.longitude])
          : null;
        const eta =
          dist !== null && speed && speed > 0.3 ? dist / speed : null;

        setState({
          isTracking: true,
          destination: dest,
          position,
          speed,
          heading,
          distanceToDestination: dist,
          etaSeconds: eta,
          error: null,
        });
      },
      (err) => {
        setState((s) => ({ ...s, error: err.message }));
      },
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 15000 }
    );
  }, []);

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null && "geolocation" in navigator) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return { ...state, startNavigation, stopNavigation, headingLabel };
};

export { headingLabel };
