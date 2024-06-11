import {Category} from "./category";

export interface Item {
    id: string,
    ASIN: string,
    quantity: number,
    categoryId: Category | string,
    title: string,
}