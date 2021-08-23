const RepairDepartment = require("../../../models/setup/vehicles/VehiclesRepairDepartment");
const SetupDao = require("../SetupDao");


class RepairDepartmentDao extends SetupDao{
    constructor() {
        super(RepairDepartment)
    }
}
module.exports= RepairDepartmentDao