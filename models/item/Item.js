
class Item {
    purchasesItems = []
    #table = 'item'

    constructor({
        id,
        family,
        subfamily,
        place,
        itemCode,
        name,
        priceVATout,
        priceVatin,
        cost,
        maximumCost,
        minimumStock,
        stock,
        itemType,
        description,
        purchasesItems = []
    }) {
        this.id = id
        this.family = family
        this.subfamily = subfamily
        this.place = place
        this.itemCode = itemCode
        this.name = name
        this.priceVATout = priceVATout
        this.priceVatin = priceVatin
        this.cost = cost
        this.maximumCost = maximumCost
        this.minimumStock = minimumStock
        this.stock = stock
        this.itemType = itemType
        this.description = description
        this.purchasesItems = purchasesItems
    }
    get table() {
        return this.#table;
    }
}
module.exports = Item