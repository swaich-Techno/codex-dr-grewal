export type Animal = "Cattle & Buffalo" | "Dogs" | "General";

export type DemoProduct = {
  id: string;
  name: string;
  image: string;
  category: Animal;
  short: string;
  detail: string;
  featured?: boolean;
};

export const demoProducts: DemoProduct[] = [
  { id: "g-appet", name: "G Appet", image: "/images/dr-grewal/g-appet.jpg", category: "Cattle & Buffalo", short: "Listed for appetite and digestive-support enquiries.", detail: "A veterinary homeopathic formulation publicly listed for appetite-related enquiries in animals. Suitability and directions must be confirmed by the Dr. Grewal team.", featured: true },
  { id: "g-liv", name: "G Liv", image: "/images/dr-grewal/g-liv.jpg", category: "General", short: "A listed veterinary formulation; intended use requires confirmation.", detail: "G Liv appears in the public catalogue, but its species and use are inconsistent across source pages. The final description, pack and directions need Dr. Grewal’s confirmation.", featured: true },
  { id: "g-uddar", name: "G Uddar", image: "/images/dr-grewal/g-uddar.jpg", category: "Cattle & Buffalo", short: "Listed for dairy-animal udder tissue support enquiries.", detail: "A publicly listed cattle formulation associated with udder tissue support. Veterinary guidance and the approved label copy should be confirmed before production.", featured: true },
  { id: "g-eliksir", name: "G Eliksir", image: "/images/dr-grewal/g-eliksir.jpg", category: "General", short: "A listed animal metabolic-support formulation.", detail: "A veterinary formulation publicly described as metabolic support. Final indications, species, pack size and directions await approval." },
  { id: "g-petworm", name: "G Petworm", image: "/images/dr-grewal/g-petworm.jpg", category: "Dogs", short: "Listed for dog deworming enquiries.", detail: "A dog-focused formulation publicly listed for deworming enquiries. Customers should seek veterinary guidance; final directions need approval." },
  { id: "g-dermi", name: "G Dermi", image: "/images/dr-grewal/g-dermi.jpg", category: "General", short: "A listed veterinary skin-support formulation.", detail: "A veterinary formulation publicly listed for skin-related enquiries. Species coverage and approved wording require confirmation." },
];
