class ProductFamily {
    #table = 'item_product_family'

    constructor({
        id,
        parent,
        name
    }) {
        this.id = id
        this.parent = parent
        this.name = name
    }
    get table() {
        return this.#table;
    }
}
module.exports = ProductFamily