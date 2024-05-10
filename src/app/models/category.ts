import { Model } from "./model";
import { Product } from "./product";

export interface Category extends Model {
    id?: number;
    name: string;
    description: string;
    image: string | File;
    products?: number[];
    Products?: Product[];
}