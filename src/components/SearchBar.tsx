import { useState, useRef, useEffect } from "react";
import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, BuildingCategory } from "@/types/building";
import { searchBuildings, getAllCategories } from "@/lib/search";
import { getCategoryLabel, getCategoryColor } from "@/data/buildings";

interface SearchBarProps {
  onSelectBuilding: (building: Building) => void;
}

const SearchBar = ({ onSelectBuilding }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<BuildingCategory | undefined>();
  const [results, setResults] = useState<Building[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 0 || selectedCategory) {
      const searchResults = searchBuildings(query, selectedCategory);
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, selectedCategory]);

  const handleSelect = (building: Building) => {
    onSelectBuilding(building);
    setQuery("");
    setSelectedCategory(undefined);
    setIsOpen(false);
    setShowFilters(false);
  };

  const clearSearch = () => {
    setQuery("");
    setSelectedCategory(undefined);
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const toggleCategory = (category: BuildingCategory) => {
    setSelectedCategory(prev => prev === category ? undefined : category);
  };

  const getCategoryBadgeClass = (category: BuildingCategory, isActive: boolean) => {
    if (!isActive) return "bg-muted text-muted-foreground hover:bg-muted/80";
    
    const classes: Record<BuildingCategory, string> = {
      faculty: "bg-primary text-primary-foreground",
      department: "bg-secondary text-secondary-foreground",
      hostel: "bg-category-hostel text-primary-foreground",
      admin: "bg-category-admin text-primary-foreground",
      facility: "bg-category-facility text-primary-foreground",
    };
    return classes[category];
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search buildings, departments, facilities..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          className="pl-10 pr-20 h-12 text-base bg-card border-border shadow-card focus:shadow-glow transition-all duration-200"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {(query || selectedCategory) && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${showFilters ? 'bg-primary text-primary-foreground' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-card rounded-lg border border-border shadow-lg z-50 animate-fade-up">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Filter by category</p>
          <div className="flex flex-wrap gap-2">
            {getAllCategories().map((category) => (
              <Badge
                key={category}
                className={`cursor-pointer transition-all ${getCategoryBadgeClass(category, selectedCategory === category)}`}
                onClick={() => toggleCategory(category)}
              >
                {getCategoryLabel(category)}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-lg border border-border shadow-lg z-50 max-h-80 overflow-y-auto animate-fade-up">
          {results.map((building, index) => (
            <button
              key={building.id}
              className={`w-full p-3 text-left hover:bg-muted transition-colors flex items-start gap-3 ${
                index !== results.length - 1 ? 'border-b border-border' : ''
              }`}
              onClick={() => handleSelect(building)}
            >
              <div
                className="w-3 h-3 rounded-full shrink-0 mt-1.5"
                style={{ backgroundColor: getCategoryColor(building.category) }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{building.name}</p>
                <p className="text-sm text-muted-foreground truncate">{building.description}</p>
              </div>
              <Badge className={`shrink-0 text-xs ${getCategoryBadgeClass(building.category, true)}`}>
                {getCategoryLabel(building.category)}
              </Badge>
            </button>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 p-6 bg-card rounded-lg border border-border shadow-lg z-50 text-center animate-fade-up">
          <p className="text-muted-foreground">No buildings found matching "{query}"</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
