class Role {
    #table = 'role'

    constructor({
        id,
        name,
        Customers,
        Vendors,
        Carriers,
        Vehicles,
        Trailers,
        Pools,
        Items,
        Family,
        Purchases,
        Orders,
        Delivery,
        Production,
        Calendar,
        Users,
        Roles,
        PaymentMethods,
        Departments,
        AddressesTypes,
        Taxes,
        CustomerType,
        CustomerCategory,
        Activity,
        Origin,
        VendorType,
        Brand,
        Model,
        Place,
        Colors
    }) {
        this.id = id
        this.name = name
        this.Customers = Customers
        this.Vendors = Vendors
        this.Carriers = Carriers
        this.Vehicles = Vehicles
        this.Trailers = Trailers
        this.Pools = Pools
        this.Items = Items
        this.Family = Family
        this.Purchases = Purchases
        this.Orders = Orders
        this.Delivery = Delivery
        this.Production = Production
        this.Calendar = Calendar
        this.Users = Users
        this.Roles = Roles
        this.PaymentMethods = PaymentMethods
        this.Departments = Departments
        this.AddressesTypes = AddressesTypes
        this.Taxes = Taxes
        this.CustomerType = CustomerType
        this.CustomerCategory = CustomerCategory
        this.Activity = Activity
        this.Origin = Origin
        this.VendorType = VendorType
        this.Brand = Brand
        this.Model = Model
        this.Place = Place
        this.Colors = Colors
    }
    get table() {
        return this.#table;
    }
}
module.exports = Role