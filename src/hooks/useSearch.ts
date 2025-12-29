import { useState, useCallback } from "react";
import { Building, BuildingCategory } from "@/types/building";
import { searchBuildings } from "@/lib/search";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BuildingCategory | undefined>(undefined);
  const [results, setResults] = useState<Building[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const search = useCallback((searchQuery: string, searchCategory?: BuildingCategory) => {
    setIsSearching(true);
    setQuery(searchQuery);
    setCategory(searchCategory);
    
    // Simulate async search for smoother UX
    setTimeout(() => {
      const searchResults = searchBuildings(searchQuery, searchCategory);
      setResults(searchResults);
      setIsSearching(false);
    }, 100);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
    setCategory(undefined);
    setResults([]);
  }, []);

  return {
    query,
    category,
    results,
    isSearching,
    search,
    clearSearch,
  };
};
