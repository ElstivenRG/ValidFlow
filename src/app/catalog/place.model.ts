export const CATEGORIES = ['Naturaleza', 'Ciudad', 'Cultura'] as const;
export type Category = typeof CATEGORIES[number];

export interface Place {
  id: number;
  name: string;
  description: string;
  category: Category;
  image: string;
  favorite: boolean;
  email: string;
}
