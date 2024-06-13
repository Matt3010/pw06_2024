import {PurchasedItem} from "./purchased-item";

export interface Purchase {
    supplierId: string
    invoiceDate: string
    invoiceNumber: string
    items: PurchasedItem[]
    id: string,
}