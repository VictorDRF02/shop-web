import { Category } from "./category";
import { Model } from "./model";

export interface Product extends Model {
    id?: number,
    name: string;
    description: string;
    price: number;
    image: File | string;
    categories: number[];
    Categories?: Category[] | any[];
}