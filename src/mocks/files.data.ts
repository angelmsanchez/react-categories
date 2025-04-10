import { FileInterface } from "../interfaces/file.interface";

export const filesMock: FileInterface[] = [
  {
    id: "1",
    align: "left",
    products: [
      {
        id: "1",
        name: "Leisha",
        price: 9.99,
        image: "https://picsum.photos/id/1/200/300",
      },
    ],
  },
  {
    id: "2",
    align: "right",
    products: [
      {
        id: "2",
        name: "Melvyn",
        price: 3.79,
        image: "https://picsum.photos/id/21/200/300",
      },
    ],
  },
  {
    id: "3",
    align: "center",
    products: [
      {
        id: "3",
        name: "Norrie",
        price: 39.99,
        image: "https://picsum.photos/id/2/200/300",
      },
    ],
  },
];
