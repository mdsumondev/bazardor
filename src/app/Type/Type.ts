export interface CategoryType {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Change {
  dir: "up" | "down";
  pct: number;
}

export interface ProductType {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: Change;
  markets: Market[];
}
