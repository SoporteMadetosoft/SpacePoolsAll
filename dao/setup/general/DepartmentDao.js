const Department = require("../../../models/setup/general/Department");
const SetupDao = require("../SetupDao");

class DepartmentDao extends SetupDao{
    
    constructor() {
        super(Department)
    }
}
module.exports = DepartmentDao