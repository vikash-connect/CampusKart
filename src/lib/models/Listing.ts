import { ObjectId } from "mongodb";

export interface IListing {
  _id?: ObjectId | string;
  title: string;
  price: number;
  category: string;
  description: string;
  whatsapp: string;
  images: string[];
  sellerId: ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}
