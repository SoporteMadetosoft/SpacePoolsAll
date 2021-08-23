const Setup = require("../Setup");

class Model extends Setup{
    #table = 'setup_model'
    constructor(params){
        super(params)
    }
    
    get table() {
        return this.#table;
    }
}
module.exports = Model