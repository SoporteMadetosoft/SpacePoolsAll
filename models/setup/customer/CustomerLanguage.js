const Setup = require('../Setup')

class CustomerLanguage extends Setup{
    #table = 'setup_language'
    constructor(param) {
        super(param)
    }
    get table() {
        return this.#table;
    }
}
module.exports = CustomerLanguage