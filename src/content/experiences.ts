import type { Experience } from "@/types/site";

export const experiences: Experience[] = [
  {
    type: "trek",
    label: "Treks",
    description: "Summits, passes and meadows from 3,000 to 4,300 m.",
    image: { destination: "har-ki-dun", index: 0 },
  },
  {
    type: "pilgrimage",
    label: "Pilgrimage",
    description: "Char Dham shrines and the highest Shiva temple on earth.",
    image: { destination: "kedarnath", index: 1 },
  },
  {
    type: "snow",
    label: "Snow",
    description: "Ski slopes of Auli and winter summits under deep powder.",
    image: { destination: "auli", index: 0 },
  },
  {
    type: "lakes",
    label: "High lakes",
    description: "Glacial water at altitudes where the air turns thin.",
    image: { destination: "chandratal", index: 0 },
  },
  {
    type: "wildlife",
    label: "Wildlife",
    description: "Sal forests, grasslands and the tigers of Corbett.",
    image: { destination: "jim-corbett", index: 0 },
  },
  {
    type: "offbeat",
    label: "Offbeat",
    description: "Wooden villages and valleys most maps forget.",
    image: { destination: "kinnaur", index: 0 },
  },
];
