const CustomerDepartments = require("../../../models/setup/general/Department");
const GenericDao = require("../../GenericDao");

class CustomerDepartmentDao extends GenericDao{
    constructor() {
        super(CustomerDepartments)
    }
     mountObj(data) {
        const departments = {
            ...data
        }
          
        return new CustomerDepartments(departments) 
    }
}
module.exports = CustomerDepartmentDao