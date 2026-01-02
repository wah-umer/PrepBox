export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  ingredients: string[];
  cookingTime: string;
  servings: string;
  stock: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Moroccan Chicken",
    price: 2499,
    originalPrice: 2999,
    image: "/images/Moroccan Chicken.jpeg",
    category: "Moroccan",
    description:
      "Experience the rich flavors of Morocco with our carefully crafted spice blend. This meal kit includes everything you need to create an authentic Moroccan chicken dish with fragrant onion rice.",
    ingredients: [
      "Premium chicken breast",
      "Moroccan spice blend",
      "Basmati rice",
      "Onions",
      "Garlic",
      "Olive oil",
    ],
    cookingTime: "45 minutes",
    servings: "2-3 servings",
    stock: 32,
  },
  {
    id: 2,
    name: "Alfredo Pasta",
    price: 1999,
    originalPrice: 2499,
    image: "/images/Alfredo Pasta.jpeg",
    category: "Pasta",
    description:
      "Creamy, indulgent Alfredo pasta made with the finest ingredients. Our signature sauce recipe brings restaurant-quality flavor to your home kitchen.",
    ingredients: [
      "Fresh pasta",
      "Cream sauce mix",
      "Parmesan cheese",
      "Butter",
      "Garlic",
      "Herbs",
    ],
    cookingTime: "30 minutes",
    servings: "2 servings",
    stock: 28,
  },
  {
    id: 3,
    name: "Tarragon Chicken",
    price: 2299,
    image: "/images/Tarragon Chicken.jpeg",
    category: "Chicken",
    description:
      "Tender chicken in a rich, creamy tarragon sauce. A classic French-inspired dish that's elegant yet easy to prepare.",
    ingredients: [
      "Chicken breast",
      "Tarragon",
      "Heavy cream",
      "White wine",
      "Shallots",
      "Butter",
    ],
    cookingTime: "35 minutes",
    servings: "2 servings",
    stock: 35,
  },
  {
    id: 5,
    name: "Peri Peri Fries Mix",
    price: 2399,
    image: "/images/Peri Peri Fries Mix.jpeg",
    category: "Chicken",
    description:
      "Spicy and flavorful peri-peri chicken with fries mix. A perfect balance of heat and tang. Inspired by Portuguese-African cuisine.",
    ingredients: [
      "Chicken pieces",
      "Peri-peri sauce",
      "Fries mix",
      "Lemon",
      "Garlic",
      "Paprika",
      "Herbs",
    ],
    cookingTime: "40 minutes",
    servings: "2-3 servings",
    stock: 24,
  },
  {
    id: 9,
    name: "Chicken Briyani",
    price: 2799,
    image: "/images/Chicken Briyani.jpeg",
    category: "Classic",
    description:
      "Classic Chicken Briyani — simplified, not compromised. Authentic flavors with pre-portioned ingredients for the perfect biryani every time.",
    ingredients: [
      "Basmati rice",
      "Chicken pieces",
      "Biryani masala",
      "Yogurt",
      "Onions",
      "Whole spices",
    ],
    cookingTime: "45 minutes",
    servings: "3-4 servings",
    stock: 40,
  },
  {
    id: 10,
    name: "Chicken Nihari",
    price: 2899,
    image: "/images/Chicken Nihari.jpeg",
    category: "Classic",
    description:
      "Slow-cooked traditional Nihari with rich, aromatic spices. A hearty meal that's perfect for special occasions.",
    ingredients: [
      "Chicken pieces",
      "Nihari masala",
      "Ginger-garlic paste",
      "Wheat flour",
      "Whole spices",
      "Ghee",
    ],
    cookingTime: "60 minutes",
    servings: "3-4 servings",
    stock: 26,
  },
];

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}
