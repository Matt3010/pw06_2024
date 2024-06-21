export interface Order {
    quantityAdjustment: boolean
    AmazonOrderId: string
    PurchaseDate: string
    LastUpdateDate: string
    OrderStatus: string
    FulfillmentChannel: string
    NumberOfItemsShipped: number
    NumberOfItemsUnshipped: number
    PaymentMethod: string
    PaymentMethodDetails: string[]
    MarketplaceId: string
    ShipmentServiceLevelCategory: string
    OrderType: string
    EarliestShipDate: string
    LatestShipDate: string
    IsBusinessOrder: boolean
    IsPrime: boolean
    IsAccessPointOrder: boolean
    IsGlobalExpressEnabled: boolean
    IsPremiumOrder: boolean
    IsSoldByAB: boolean
    IsIBA: boolean
    ShippingAddress: ShippingAddress
    BuyerInfo: BuyerInfo
    OrderItems: any;
}

export interface ShippingAddress {
    Name: string
    AddressLine1: string
    City: string
    StateOrRegion: string
    PostalCode: string
    CountryCode: string
    _id: string
}

export interface BuyerInfo {
    BuyerEmail: string
    BuyerName: string
    BuyerTaxInfo: BuyerTaxInfo
    PurchaseOrderNumber: string
    _id: string
}

export interface BuyerTaxInfo {
    CompanyLegalName: string
    _id: string
}
