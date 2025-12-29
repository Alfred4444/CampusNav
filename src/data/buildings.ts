import { Building } from "@/types/building";

export const campusBuildings: Building[] = [
  {
    id: "1",
    name: "Engineering Block A",
    category: "faculty",
    latitude: 6.8541,
    longitude: 3.9123,
    description: "Mechanical and Electrical Engineering departments with state-of-the-art laboratories and lecture halls.",
    facilities: ["Labs", "Lecture Halls", "Computer Center"],
    openingHours: "7:00 AM - 9:00 PM"
  },
  {
    id: "2",
    name: "Engineering Block B",
    category: "faculty",
    latitude: 6.8548,
    longitude: 3.9130,
    description: "Civil and Chemical Engineering departments featuring modern research facilities.",
    facilities: ["Research Labs", "Seminar Rooms", "Library"],
    openingHours: "7:00 AM - 9:00 PM"
  },
  {
    id: "3",
    name: "Science Complex",
    category: "faculty",
    latitude: 6.8535,
    longitude: 3.9110,
    description: "Houses Physics, Chemistry, and Biology departments with advanced research equipment.",
    facilities: ["Science Labs", "Greenhouse", "Observatory"],
    openingHours: "8:00 AM - 8:00 PM"
  },
  {
    id: "4",
    name: "Computer Science Department",
    category: "department",
    latitude: 6.8555,
    longitude: 3.9140,
    description: "Modern computing facilities with multiple computer labs and programming studios.",
    facilities: ["Computer Labs", "Server Room", "AI Research Center"],
    openingHours: "24/7"
  },
  {
    id: "5",
    name: "Mathematics Department",
    category: "department",
    latitude: 6.8560,
    longitude: 3.9145,
    description: "Home to the Mathematics and Statistics departments.",
    facilities: ["Tutorial Rooms", "Resource Center"],
    openingHours: "8:00 AM - 6:00 PM"
  },
  {
    id: "6",
    name: "Male Hostel A (Unity Hall)",
    category: "hostel",
    latitude: 6.8520,
    longitude: 3.9100,
    description: "Modern male residential facility with 500 bed spaces and recreational areas.",
    facilities: ["Laundry", "Common Room", "Study Area"],
    openingHours: "24/7"
  },
  {
    id: "7",
    name: "Male Hostel B (Independence Hall)",
    category: "hostel",
    latitude: 6.8515,
    longitude: 3.9095,
    description: "Premium male accommodation with air-conditioned rooms and WiFi.",
    facilities: ["WiFi", "AC Rooms", "Gym"],
    openingHours: "24/7"
  },
  {
    id: "8",
    name: "Female Hostel A (Queen Amina Hall)",
    category: "hostel",
    latitude: 6.8570,
    longitude: 3.9150,
    description: "Secure female residential complex with modern amenities.",
    facilities: ["Security", "Salon", "Mini Market"],
    openingHours: "24/7"
  },
  {
    id: "9",
    name: "Female Hostel B (Moremi Hall)",
    category: "hostel",
    latitude: 6.8575,
    longitude: 3.9155,
    description: "Contemporary female hostel with study rooms and recreational facilities.",
    facilities: ["Study Rooms", "TV Room", "Kitchen"],
    openingHours: "24/7"
  },
  {
    id: "10",
    name: "Senate Building",
    category: "admin",
    latitude: 6.8545,
    longitude: 3.9135,
    description: "Administrative headquarters housing the Vice Chancellor's office and senate chambers.",
    facilities: ["VC Office", "Senate Hall", "Board Room"],
    openingHours: "8:00 AM - 5:00 PM"
  },
  {
    id: "11",
    name: "Bursary Department",
    category: "admin",
    latitude: 6.8550,
    longitude: 3.9128,
    description: "Financial services including fee payments, scholarships, and student accounts.",
    facilities: ["Payment Counters", "Accounts Office"],
    openingHours: "9:00 AM - 4:00 PM"
  },
  {
    id: "12",
    name: "Student Affairs",
    category: "admin",
    latitude: 6.8542,
    longitude: 3.9132,
    description: "Student welfare services, counseling, and extracurricular activities coordination.",
    facilities: ["Counseling Center", "Student Union Office"],
    openingHours: "8:00 AM - 5:00 PM"
  },
  {
    id: "13",
    name: "University Library",
    category: "facility",
    latitude: 6.8538,
    longitude: 3.9125,
    description: "Main library with over 500,000 volumes, e-resources, and quiet study zones.",
    facilities: ["Reading Halls", "E-Library", "Group Study Rooms"],
    openingHours: "7:00 AM - 11:00 PM"
  },
  {
    id: "14",
    name: "Sports Complex",
    category: "facility",
    latitude: 6.8510,
    longitude: 3.9080,
    description: "Multi-purpose sports facility with stadium, gymnasium, and swimming pool.",
    facilities: ["Stadium", "Gym", "Swimming Pool", "Tennis Courts"],
    openingHours: "6:00 AM - 10:00 PM"
  },
  {
    id: "15",
    name: "University Health Center",
    category: "facility",
    latitude: 6.8565,
    longitude: 3.9160,
    description: "24-hour medical facility providing primary healthcare services to students and staff.",
    facilities: ["Emergency", "Pharmacy", "Dental Clinic"],
    openingHours: "24/7"
  },
  {
    id: "16",
    name: "Cafeteria Complex",
    category: "facility",
    latitude: 6.8540,
    longitude: 3.9115,
    description: "Main dining area with multiple food vendors and seating for 1000 students.",
    facilities: ["Food Court", "Coffee Shop", "ATM"],
    openingHours: "6:00 AM - 10:00 PM"
  },
  {
    id: "17",
    name: "ICT Center",
    category: "facility",
    latitude: 6.8553,
    longitude: 3.9138,
    description: "Information and Communication Technology hub with high-speed internet and training facilities.",
    facilities: ["Internet Cafe", "Training Rooms", "Help Desk"],
    openingHours: "8:00 AM - 8:00 PM"
  },
  {
    id: "18",
    name: "Business Administration Faculty",
    category: "faculty",
    latitude: 6.8558,
    longitude: 3.9120,
    description: "Houses Business, Economics, and Accounting departments.",
    facilities: ["Lecture Halls", "Case Study Rooms", "Business Lab"],
    openingHours: "8:00 AM - 7:00 PM"
  },
  {
    id: "19",
    name: "Arts & Humanities Block",
    category: "faculty",
    latitude: 6.8532,
    longitude: 3.9142,
    description: "Home to English, History, Philosophy, and Fine Arts departments.",
    facilities: ["Art Studio", "Theater", "Language Lab"],
    openingHours: "8:00 AM - 6:00 PM"
  },
  {
    id: "20",
    name: "Law Faculty",
    category: "faculty",
    latitude: 6.8528,
    longitude: 3.9118,
    description: "Faculty of Law with moot court and legal aid clinic.",
    facilities: ["Moot Court", "Law Library", "Legal Aid Clinic"],
    openingHours: "8:00 AM - 8:00 PM"
  }
];

export const getCategoryColor = (category: Building["category"]): string => {
  const colors: Record<Building["category"], string> = {
    faculty: "hsl(217, 91%, 40%)",
    department: "hsl(174, 62%, 40%)",
    hostel: "hsl(280, 68%, 50%)",
    admin: "hsl(25, 95%, 53%)",
    facility: "hsl(142, 71%, 45%)",
  };
  return colors[category];
};

export const getCategoryLabel = (category: Building["category"]): string => {
  const labels: Record<Building["category"], string> = {
    faculty: "Faculty",
    department: "Department",
    hostel: "Hostel",
    admin: "Administration",
    facility: "Facility",
  };
  return labels[category];
};
