class ItemsColorStock {
    #table = 'item_colors'

    constructor ({
        id,
        idColor,
        stock
    }){
        this.id = id
        this.idColor = idColor
        this.stock = stock
    }
    get table() {
        return this.#table;
    }
}
module.exports = ItemsColorStock