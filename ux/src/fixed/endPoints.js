const globalEndpoints = {
    FileManager: '/global/fileManager',
    ItemType: '/global/itemType',
    Language: '/global/language',
    Mode: '/global/mode',
    Status: '/global/status',
    ProductionStatus: '/global/productionStatus',
    PayDay: '/global/payday'
}

const setupEndpoints = {
    PaymentMethods: '/setup/general/paymentMethod',
    Departments: '/setup/general/department',
    AddressesTypes: '/setup/general/addressesTypes',
    Taxes: '/setup/general/tax',

    CustomerType: '/setup/customers/type',
    CustomerCategory: '/setup/customers/category',
    Activity: '/setup/customers/activities',
    Origin: '/setup/customers/origin',

    VendorType: '/setup/vendors/type',

    Brand: '/setup/vehicles/brand',
    Model: '/setup/vehicles/brandModel',

    Place: '/setup/items/place'


}



export const endPoints = {

    Customers: '/customers',
    Vendors: '/vendors',

    Carriers: '/carriers',
    Vehicles: '/vehicles',
    Trailers: '/trailers',

    Purchases: '/purchases',

    Pools: '/pools',

    Orders: '/orders',
    Items: '/items/item',
    Family: '/items/productFamily',
    Productions: '/production',
    Calendar: '/calendar',

    ...globalEndpoints,
    ...setupEndpoints
}