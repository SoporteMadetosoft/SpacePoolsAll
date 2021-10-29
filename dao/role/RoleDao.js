const Role = require("../../models/role/Role");

const GenericDao = require("../GenericDao");
const RoleStatusDao = require("./RoleStatusDao");

class RoleDao extends GenericDao {

    constructor() {
        super(Role);
        this.RoleStatusDao = new RoleStatusDao()
    }

    async mountObj(data) {
        const role = {
            ...data,
            productionStatus: await this.RoleStatusDao.findByRoleId(data.id),
            Customers: JSON.parse(data.Customers.toString()),
            Vendors: JSON.parse(data.Vendors.toString()),
            Carriers: JSON.parse(data.Carriers.toString()),
            Vehicles: JSON.parse(data.Vehicles.toString()),
            Trailers: JSON.parse(data.Trailers.toString()),
            Pools: JSON.parse(data.Pools.toString()),
            Items: JSON.parse(data.Items.toString()),
            Family: JSON.parse(data.Family.toString()),
            Purchases: JSON.parse(data.Purchases.toString()),
            Orders: JSON.parse(data.Orders.toString()),
            Delivery: JSON.parse(data.Delivery.toString()),
            Production: JSON.parse(data.Production.toString()),
            Calendar: JSON.parse(data.Calendar.toString()),
            Users: JSON.parse(data.Users.toString()),
            Roles: JSON.parse(data.Roles.toString()),
            PaymentMethods: JSON.parse(data.PaymentMethods.toString()),
            Departments: JSON.parse(data.Departments.toString()),
            AddressesTypes: JSON.parse(data.AddressesTypes.toString()),
            Taxes: JSON.parse(data.Taxes.toString()),
            CustomerType: JSON.parse(data.CustomerType.toString()),
            CustomerCategory: JSON.parse(data.CustomerCategory.toString()),
            Activity: JSON.parse(data.Activity.toString()),
            Origin: JSON.parse(data.Origin.toString()),
            VendorType: JSON.parse(data.VendorType.toString()),
            Brand: JSON.parse(data.Brand.toString()),
            Model: JSON.parse(data.Model.toString()),
            Place: JSON.parse(data.Place.toString()),
            Colors: JSON.parse(data.Colors.toString())
        }
        return role
    }

    async mountList(data) {
        const list = {
            ...data,
        }

        const { id, name } = list
        const nObj = { id, name }
        return nObj
    }

}

module.exports = RoleDao