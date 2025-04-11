import { useDrag, useDrop } from "react-dnd";
import { ItemTypes, ProductInterface } from "../../interfaces/";
import "./product.css";
import { useRef } from "react";

interface Props {
  product: ProductInterface;
  onMoveProduct: (draggedId: string, id: string) => void;
}

export function Product({ product, onMoveProduct }: Props) {
  const ref = useRef(null);
  const [{ isDragging, handlerId }, connectDrag] = useDrag({
    type: ItemTypes.PRODUCT,
    item: { id: product.id },
    collect: (monitor) => {
      const result = {
        handlerId: monitor.getHandlerId(),
        isDragging: monitor.isDragging(),
      };
      return result;
    },
  });
  const opacity = isDragging ? 0 : 1;

  const [, connectDrop] = useDrop({
    accept: ItemTypes.PRODUCT,
    hover({ id: draggedId }: { id: string; type: string }) {
      if (draggedId !== product.id) {
        onMoveProduct(draggedId, product.id);
      }
    },
  });
  connectDrag(ref);
  connectDrop(ref);
  return (
    <div
      className="product-container"
      ref={ref}
      data-handler-id={handlerId}
      style={{
        opacity,
      }}
    >
      <h3>{product.name}</h3>
      <p>Price: {product.price}</p>
      <img src={product.image} alt={product.name} />
    </div>
  );
}
