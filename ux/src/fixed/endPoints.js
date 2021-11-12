const globalEndpoints = {
    FileManager: '/global/fileManager',
    ItemType: '/global/itemType',
    Language: '/global/language',
    Mode: '/global/mode',
    Status: '/global/status',
    ProductionStatus: '/global/productionStatus',
    PurchaseStatus: '/global/purchaseStatus',
    Show: '/global/show',
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
    Model: '/setup/vehicles/model',

    Place: '/setup/items/place',
    Colors: '/setup/items/colors'


}



export const endPoints = {

    Customers: '/customers',
    Vendors: '/vendors',
    CustomerData: '/customerData',
    Notification: '/notification',

    Carriers: '/carriers',
    Vehicles: '/vehicles',
    VRepair: '/vehicles/repair',
    Trailers: '/trailers',
    Alerts: '/alerts',
    TRepair: '/trailers/repair',

    Purchases: '/purchases',

    Pools: '/pools',

    Orders: '/orders',
    Delivery: '/delivery',
    Items: '/items/item',
    Family: '/items/productFamily',
    ItemColors : '/items/itemColors',
    Productions: '/production',
    Calendar: '/calendar',
    Users: '/users',
    Roles: '/roles',

    ...globalEndpoints,
    ...setupEndpoints
}