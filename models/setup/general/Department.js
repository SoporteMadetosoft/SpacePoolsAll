const Setup = require('../Setup')

class Department extends Setup {
    #table ='setup_department'

    constructor(params){
        super(params)
    }
    
    get table() {
        return this.#table;
    }
};
module.exports = Department
