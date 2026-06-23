export interface PlanetData {
  id: string;
  name: string;
  label: string;
  orbitRadius: number;
  size: number;
  color: string;
  emissive: string;
  glowColor: string;
  speed: number;
  description: string;
  icon: string;
  theme: string;
}

export const PLANETS: PlanetData[] = [
  {
    id: "about",
    name: "Earth Prime",
    label: "About Me",
    orbitRadius: 28,
    size: 3.2,
    color: "#1a6b3c",
    emissive: "#0a3d22",
    glowColor: "#22c55e",
    speed: 0.45,
    description: "Living Earth-like planet — learn about Adeep",
    icon: "🌍",
    theme: "earth",
  },
  {
    id: "skills",
    name: "Tech Nexus",
    label: "Skills",
    orbitRadius: 44,
    size: 2.8,
    color: "#7c3aed",
    emissive: "#4c1d95",
    glowColor: "#a855f7",
    speed: 0.32,
    description: "Cyberpunk tech planet — explore all skills",
    icon: "⚡",
    theme: "cyber",
  },
  {
    id: "projects",
    name: "Innovation Sphere",
    label: "Projects",
    orbitRadius: 60,
    size: 3.6,
    color: "#0891b2",
    emissive: "#164e63",
    glowColor: "#06b6d4",
    speed: 0.25,
    description: "Research civilization — discover my projects",
    icon: "🚀",
    theme: "innovation",
  },
  {
    id: "experience",
    name: "Career Orbit",
    label: "Experience",
    orbitRadius: 76,
    size: 2.5,
    color: "#b45309",
    emissive: "#78350f",
    glowColor: "#f59e0b",
    speed: 0.18,
    description: "Space station network — my career journey",
    icon: "🛸",
    theme: "station",
  },
  {
    id: "achievements",
    name: "Hall of Legends",
    label: "Achievements",
    orbitRadius: 90,
    size: 2.9,
    color: "#b8860b",
    emissive: "#7c5f00",
    glowColor: "#fbbf24",
    speed: 0.13,
    description: "Golden achievement planet — trophies & awards",
    icon: "🏆",
    theme: "gold",
  },
  {
    id: "contact",
    name: "Communication Hub",
    label: "Contact",
    orbitRadius: 106,
    size: 2.6,
    color: "#be185d",
    emissive: "#831843",
    glowColor: "#ec4899",
    speed: 0.09,
    description: "Advanced communication colony — reach out",
    icon: "📡",
    theme: "comm",
  },
];
