import type { StateInfo } from "@/types/destination";

export const states: StateInfo[] = [
  {
    slug: "uttarakhand",
    name: "Uttarakhand",
    epithet: "Devbhoomi — Land of the Gods",
    intro:
      "Where the Ganga is born, and every ridge seems to carry a temple bell.",
    description:
      "Garhwal and Kumaon hold the Char Dham shrines, alpine meadows that bloom for a single season, and old hill towns wrapped in deodar. It is a place for pilgrims and trekkers alike — and for anyone who wants to watch the sun light up Nanda Devi.",
    heroImage: { destination: "kedarnath", index: 1 },
    stats: [
      { label: "Destinations", value: "13" },
      { label: "Highest point we trek", value: "4,000 m" },
      { label: "UNESCO site", value: "Valley of Flowers" },
    ],
  },
  {
    slug: "himachal",
    name: "Himachal Pradesh",
    epithet: "Where the cold desert meets the cedar forest",
    intro:
      "From apple orchards in Kullu to the moonscape of Spiti, in a single road trip.",
    description:
      "Himachal changes face with every pass you cross: Tibetan monasteries clinging to cliffs, glacial lakes at 4,300 metres, paragliders over the Kangra valley and quiet wooden villages in Tirthan. It rewards the slow traveller.",
    heroImage: { destination: "spiti-valley", index: 1 },
    stats: [
      { label: "Destinations", value: "11" },
      { label: "Highest lake", value: "4,300 m" },
      { label: "Mountain passes", value: "6+" },
    ],
  },
];
