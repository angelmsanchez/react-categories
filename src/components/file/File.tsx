import { AlignEnum } from "../../enums";
import { FileInterface } from "../../interfaces/file.interface";
import { Product, Button } from "../";
import "./File.css";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { ItemTypes } from "../../interfaces";

interface Props {
  file: FileInterface;
  onChangeAlign: (type: AlignEnum, id: string) => void;
  onAddProduct: (id: string) => void;
  onDeleteProduct: (idFile: string, idProduct: string) => void;
  onMoveFile: (draggedId: string, id: string) => void;
  onMoveProduct: (draggedId: string, id: string) => void;
}

export function File({
  file,
  onChangeAlign,
  onAddProduct,
  onDeleteProduct,
  onMoveFile,
  onMoveProduct,
}: Props) {
  const ref = useRef(null);
  const [{ isDragging, handlerId }, connectDrag] = useDrag({
    type: ItemTypes.FILE,
    item: { id: file.id },
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
    accept: ItemTypes.FILE,
    hover({ id: draggedId }: { id: string; type: string }) {
      if (draggedId !== file.id) {
        onMoveFile(draggedId, file.id);
      }
    },
  });
  connectDrag(ref);
  connectDrop(ref);

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className="file-container"
      style={{
        justifyContent: file.align,
        opacity,
      }}
    >
      {file.products.map((product) => (
        <section key={product.id} className="product-container">
          <Product product={product} onMoveProduct={onMoveProduct} />
          {file.products.length > 1 && (
            <div className="button-remove">
              <Button
                icon="remove"
                title="Eliminar Producto"
                onClick={() => onDeleteProduct(file.id, product.id)}
              />
            </div>
          )}
        </section>
      ))}
      <div className="file-info">Align: {file.align}</div>
      <div className="file-buttons">
        <Button
          icon="format_align_center"
          selected={file.align === AlignEnum.CENTER}
          onClick={() => onChangeAlign(AlignEnum.CENTER, file.id)}
        />
        <Button
          icon="format_align_right"
          selected={file.align === AlignEnum.RIGHT}
          onClick={() => onChangeAlign(AlignEnum.RIGHT, file.id)}
        />
        <Button
          icon="format_align_left"
          selected={file.align === AlignEnum.LEFT}
          onClick={() => onChangeAlign(AlignEnum.LEFT, file.id)}
        />
        {file.products.length < 3 && (
          <Button
            icon="add"
            title="Agregar Producto"
            onClick={() => onAddProduct(file.id)}
          />
        )}
      </div>
    </div>
  );
}
