class ProductFamily{
    base = {}
    #table = 'item_product_family'

    constructor({
        id,
        parent,
        familyCode,
        name
    }){
        this.base.id = id
        this.base.parent = parent
        this.base.familyCode = familyCode
        this.base.name = name
    }
    get table() {
        return this.#table;
    }
}
module.exports = ProductFamily