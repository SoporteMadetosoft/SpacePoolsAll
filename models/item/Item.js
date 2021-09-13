
class Item {
    #table = 'item'
    
    constructor({
        id,
        family,
        subfamily,
        place,
        itemCode,
        name,
        priceVATout,
        priceVATin,
        cost,
        maximumCost,
        minimumStock,
        stock,
        itemType,
        description
    }) {
        this.id = id
        this.family = family
        this.subfamily = subfamily
        this.place = place
        this.itemCode = itemCode
        this.name = name
        this.priceVATout = priceVATout
        this.priceVATin = priceVATin
        this.cost = cost
        this.maximumCost = maximumCost
        this.minimumStock = minimumStock
        this.stock = stock
        this.itemType = itemType
        this.description = description
    }
    get table() {
        return this.#table;
    }
}
module.exports = Item