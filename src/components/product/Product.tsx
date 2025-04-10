import { ProductInterface } from "../../interfaces/";
import "./product.css";

interface Props {
  product: ProductInterface;
}

export function Product({ product }: Props) {
  return (
    <div className="product-container" style={{}}>
      <h3>{product.name}</h3>
      <p>Price: {product.price}</p>
      <img src={product.image} alt={product.name} />
    </div>
  );
}
