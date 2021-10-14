class ItemColors {
    #table = 'item_colors'

    constructor({
        id,
        idItem,
        idColor
    }) {
        this.id = id
        this.idItem = idItem
        this.idColor = idColor
    }
    get table() {
        return this.#table;
    }
}
module.exports = ItemColors