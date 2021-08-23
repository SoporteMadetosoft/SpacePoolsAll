
class Item{
    base = {}
    purchasesItems=[]
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
        purchasesItems=[]
    }){
        this.base.id = id
        this.base.family = family
        this.base.subfamily = subfamily
        this.base.place = place
        this.base.itemCode = itemCode
        this.base.name = name
        this.base.priceVATout = priceVATout
        this.base.priceVatin = priceVatin
        this.base.cost = cost
        this.base.maximumCost = maximumCost
        this.base.minimumStock = minimumStock
        this.base.stock = stock
        this.base.itemType = itemType
        this.base.description = description
        this.purchasesItems = purchasesItems
    }
    get table() {
        return this.#table;
    }
}
module.exports = Item