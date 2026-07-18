export const listings = [
  {
    id: "golden-tulip-residences",
    name: "Golden Tulip Residences",
    location: "Airport Residential, Greater Accra",
    type: "Apartment",
    unitsAvailable: 3,
    rent: 3500,
    currency: "GH₵",
    beds: 2,
    baths: 2,
    sqft: 1200,
    image: "https://picsum.photos/seed/golden-tulip-residences/900/600",
    accent: "linear-gradient(135deg, #1a6b5a, #2f9e83)",
    description:
      "Experience modern living in this stunning 2-bedroom apartment at Airport Residential Area. Features spacious rooms, tiled floors, fitted kitchen, 24-hour security, and a private balcony with views of the Accra skyline. Close to the Kotoka International Airport and major shopping centres.",
    amenities: ["Parking", "24hr Security", "Balcony", "Fitted Kitchen", "Water Tank", "Internet"],
    insights: { matchScore: 95, marketDemand: 88, fairPrice: 3700, tip: "This property is priced below market value — great deal!" },
    landlord: { name: "Kwame Mensah", phone: "+233 24 123 4567", email: "kwame.mensah@gmail.com" },
  },
  {
    id: "santasi-family-home",
    name: "Santasi Family Home",
    location: "Santasi, Ashanti Region",
    type: "House",
    unitsAvailable: 1,
    rent: 2200,
    currency: "GH₵",
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: "https://picsum.photos/seed/santasi-family-home/900/600",
    accent: "linear-gradient(135deg, #14532d, #4d9d6f)",
    description:
      "A spacious 3-bedroom family home tucked in a quiet, walled compound in Santasi. Comes with a generous backyard, dedicated water storage, and easy access to schools and the Kumasi city centre — ideal for families who want room to grow.",
    amenities: ["Walled Compound", "Backyard", "Water Tank", "Parking"],
    insights: { matchScore: 89, marketDemand: 74, fairPrice: 2350, tip: "Demand in this neighbourhood is rising — book a viewing soon." },
    landlord: { name: "Abena Darkwa", phone: "+233 20 456 7890", email: "abena.darkwa@gmail.com" },
  },
  {
    id: "teshie-beachside-studio",
    name: "Teshie Beachside Studio",
    location: "Teshie, Greater Accra",
    type: "Studio",
    unitsAvailable: 5,
    rent: 1400,
    currency: "GH₵",
    beds: 1,
    baths: 1,
    sqft: 650,
    image: "https://picsum.photos/seed/teshie-beachside-studio/900/600",
    accent: "linear-gradient(135deg, #0e7490, #22a6c9)",
    description:
      "A bright, self-contained studio just minutes from the Teshie coastline. The rooftop terrace catches the sea breeze in the evenings, and the compact, fitted kitchenette keeps everything within reach. A great fit for young professionals.",
    amenities: ["Rooftop Terrace", "Kitchenette", "Fitted Wardrobe", "24hr Security"],
    insights: { matchScore: 91, marketDemand: 82, fairPrice: 1500, tip: "Popular with first-time renters — 5 units left this month." },
    landlord: { name: "Yaw Boateng", phone: "+233 27 789 0123", email: "yaw.boateng@gmail.com" },
  },
];

export function getListing(id) {
  return listings.find((l) => l.id === id);
}