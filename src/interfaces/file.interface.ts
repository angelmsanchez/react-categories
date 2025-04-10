import { ProductInterface } from "./product.interface";

export interface FileInterface {
  id: string;
  align: 'center' | 'left' | 'right';
  products: ProductInterface[];
}
