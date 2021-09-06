class Roles {

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
        FamilyPurchases,
        Orders,
        Production,
        PaymentMethods,
        Departments,
        AddressesTypes,
        CustomerType,
        CustomerCategory,
        Activities,
        Origins,
        VendorType,
        Brand,
        Model,
        Place
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
        this.FamilyPurchases = FamilyPurchases
        this.Orders = Orders
        this.Production = Production
        this.PaymentMethods = PaymentMethods
        this.Departments = Departments
        this.AddressesTypes = AddressesTypes
        this.CustomerType = CustomerType
        this.CustomerCategory = CustomerCategory
        this.Activities = Activities
        this.Origins = Origins
        this.VendorType = VendorType
        this.Brand = Brand
        this.Model = Model
        this.Place = Place
    }

    get table() {
        return this.#table;
    }

}
module.exports = Roles