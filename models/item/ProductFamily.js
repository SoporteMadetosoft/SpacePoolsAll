class ProductFamily {
    #table = 'item_product_family'

    constructor({
        id,
        parent,
        familyCode,
        name
    }) {
        this.id = id
        this.parent = parent
        this.familyCode = familyCode
        this.name = name
    }
    get table() {
        return this.#table;
    }
}
module.exports = ProductFamily