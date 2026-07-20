export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export type CartItem = Product & {
  quantity: number;
};
