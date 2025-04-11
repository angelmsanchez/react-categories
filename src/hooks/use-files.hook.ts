import { useState } from "react";
import { FileInterface } from "../interfaces/file.interface";
import { filesMock, productsMock } from "../mocks/";
import { AlignEnum } from "../enums";
import { ProductInterface } from "../interfaces";
import { v4 as uuidv4 } from "uuid";

export const useFiles = () => {
  const [files, setFiles] = useState<FileInterface[]>(filesMock);
  const [availableProducts, setAvailableProducts] =
    useState<ProductInterface[]>(productsMock);

  const handleAddProduct = (id: string) => {
    setFiles((prevFiles) => [
      ...prevFiles.map((file) => {
        if (file.id === id) {
          return {
            ...file,
            products: [...file.products, availableProducts[0]],
          };
        }
        return file;
      }),
    ]);
    setAvailableProducts((products) => products.slice(1));
  };

  const handleDeleteProduct = (idFile: string, idProduct: string) => {
    setFiles((prevFiles) => [
      ...prevFiles.map((file) => {
        if (file.id === idFile) {
          return {
            ...file,
            products: [
              ...file.products.filter((product) => product.id !== idProduct),
            ],
          };
        }
        return file;
      }),
    ]);
  };

  const handleAddFile = () => {
    setFiles((prevFiles) => [
      ...prevFiles,
      { id: uuidv4(), products: [availableProducts[0]], align: "center" },
    ]);
    setAvailableProducts((products) => products.slice(1));
  };

  const handleMoveFile = (idMove: string, idAfter: string) => {
    setFiles((prevFiles) => [
      ...prevFiles.sort((a, b) => {
        if (a.id !== idMove && b.id !== idMove) return 0;
        if (a.id === idMove && b.id === idAfter) return -1;
        if (a.id === idAfter && b.id === idMove) return -1;
        return 0;
      }),
    ]);
  };

  const handleMoveProduct = (
    idMove: string,
    idAfter: string,
    idFile: string
  ) => {
    setFiles((prevFiles) => [
      ...prevFiles.map((file) => {
        if (file.id === idFile) {
          const products = [...file.products];
          const moveIndex = products.findIndex(
            (product) => product.id === idMove
          );
          const afterIndex = products.findIndex(
            (product) => product.id === idAfter
          );
          if (moveIndex !== -1 && afterIndex !== -1) {
            const [movedProduct] = products.splice(moveIndex, 1);
            products.splice(afterIndex, 0, movedProduct);
          }
          return { ...file, products };
        }
        return file;
      }),
    ]);
  };

  const handleChangeAlign = (type: AlignEnum, id: string) => {
    setFiles((prevFiles) => [
      ...prevFiles.map((file) => {
        if (file.id === id) {
          return { ...file, align: type };
        }
        return file;
      }),
    ]);
  };

  return {
    files,
    products: availableProducts,
    handleAddProduct,
    handleAddFile,
    handleChangeAlign,
    handleDeleteProduct,
    handleMoveFile,
    handleMoveProduct,
  };
};
