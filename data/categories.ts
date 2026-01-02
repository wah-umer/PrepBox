export interface Category {
  name: string;
  href: string;
  image: string;
}

export const categories: Category[] = [
  {
    name: "Moroccan Chicken",
    href: "/shop?category=Moroccan",
    image: "/images/Moroccan Chicken.jpeg",
  },
  {
    name: "Alfredo Pasta",
    href: "/shop?category=Pasta",
    image: "/images/Alfredo Pasta.jpeg",
  },
  {
    name: "Tarragon Chicken",
    href: "/shop?category=Chicken",
    image: "/images/Tarragon Chicken.jpeg",
  },
  {
    name: "Peri Peri Fries Mix",
    href: "/shop?category=Chicken",
    image: "/images/Peri Peri Fries Mix.jpeg",
  },
];

export const categoryFilters = ["All", "Classic", "Moroccan", "Pasta", "Chicken", "Combo"];

