const Setup = require('../Setup')

class PaymentMethods extends Setup {
    #table ='setup_payment_methods'

    constructor(params){
        super(params)
        this.base.value = params.value
    }
    
    get table() {
        return this.#table;
    }
};
module.exports = PaymentMethods