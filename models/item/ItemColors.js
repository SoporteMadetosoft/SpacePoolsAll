class ItemColors {
    #table = 'item_colors'

    constructor({
        id,
        idcolor,
        stock
    }) {
        this.id = id
        this.idcolor = idcolor 
        this.stock = stock
    }
    get table() {
        return this.#table;
    }
}
module.exports = ItemColors