import {Category} from "./category";

export interface Item {
    id: string,
    ASIN: string,
    quantity: string,
    categoryId: Category,
}
