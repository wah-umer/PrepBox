import { Product } from "./products";

export interface Combo extends Product {
  items: string[];
  savings: string;
}

export const combos: Combo[] = [
  {
    id: 100,
    name: "Dawaat Deal",
    price: 4499,
    originalPrice: 5499,
    image: "/images/Combo 1.jpeg",
    category: "Combo",
    description:
      "Perfect for hosting without the stress. Includes 2 classic meal kits (e.g. Briyani + Nihari).",
    ingredients: ["Chicken Briyani kit", "Chicken Nihari kit"],
    cookingTime: "60 minutes",
    servings: "4-6 servings",
    items: ["Chicken Briyani", "Chicken Nihari"],
    savings: "Rs. 1000",
    stock: 22,
  },
  {
    id: 101,
    name: "Busy Week Combo",
    price: 3899,
    originalPrice: 4499,
    image: "/images/Combo 2.jpeg",
    category: "Combo",
    description:
      "Two meals. Zero planning. Any 2 best-selling meal kits for working couples and professionals.",
    ingredients: ["2 best-selling meal kits"],
    cookingTime: "30 minutes",
    servings: "4 servings",
    items: ["Alfredo Pasta", "Moroccan Chicken", "Tarragon Chicken"],
    savings: "Rs. 600",
    stock: 37,
  },
];

