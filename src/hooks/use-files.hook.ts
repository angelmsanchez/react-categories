import { useState } from "react";
import { FileInterface } from "../interfaces/file.interface";
import { filesMock, products } from "../mocks/";
import { AlignEnum } from "../enums";
import { ProductInterface } from "../interfaces";
import { v4 as uuidv4 } from "uuid";

export const useFiles = () => {
  const [files, setFiles] = useState<FileInterface[]>(filesMock);
  const [availableProducts, setAvailableProducts] =
    useState<ProductInterface[]>(products);

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
  };
};
