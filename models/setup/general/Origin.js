const Setup = require('../Setup')


class Origin extends Setup {
    #table = 'setup_origin'
    constructor({ id, name, logo, info }) {
        super({ id, name }),
            this.logo = logo,
            this.info = info

    }
    get table() {
        return this.#table;
    }
};

module.exports = Origin