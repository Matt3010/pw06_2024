import {Category} from "./category";

export interface Supplier {
    id: string,
    ASIN: string,
    quantity: number,
    categoryId: Category | string,
    title: string,
}
