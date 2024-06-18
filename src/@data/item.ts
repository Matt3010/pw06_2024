import {Category} from "./category";

// Valid also for item
export interface Supplier {
    id: string,
    ASIN: string,
    quantity: number,
    categoryId: Category | string,
    title: string,
    fornitore?: string,
}
