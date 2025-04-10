import { AlignEnum } from "../../enums";
import { FileInterface } from "../../interfaces/file.interface";
import { Product, Button } from "../";
import "./File.css";

interface Props {
  file: FileInterface;
  onChangeAlign: (type: AlignEnum, id: string) => void;
  onAddProduct: (id: string) => void;
  onDeleteProduct: (idFile: string, idProduct: string) => void;
}

export function File({
  file,
  onChangeAlign,
  onAddProduct,
  onDeleteProduct,
}: Props) {
  return (
    <div
      className="file-container"
      style={{
        justifyContent: file.align,
      }}
    >
      {file.products.map((product) => (
        <section key={product.id} className="product-container">
          <Product product={product} />
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
