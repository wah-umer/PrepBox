export interface Favorite {
  productId: number;
}

// Simple in-memory favorites (for MVP - could use localStorage for persistence)
let favorites: Favorite[] = [];

export function getFavorites(): Favorite[] {
  return favorites;
}

export function addToFavorites(productId: number): void {
  if (!favorites.find((f) => f.productId === productId)) {
    favorites.push({ productId });
  }
}

export function removeFromFavorites(productId: number): void {
  favorites = favorites.filter((f) => f.productId !== productId);
}

export function isFavorite(productId: number): boolean {
  return favorites.some((f) => f.productId === productId);
}

export function toggleFavorite(productId: number): void {
  if (isFavorite(productId)) {
    removeFromFavorites(productId);
  } else {
    addToFavorites(productId);
  }
}

export function getFavoritesCount(): number {
  return favorites.length;
}

export function clearFavorites(): void {
  favorites = [];
}

