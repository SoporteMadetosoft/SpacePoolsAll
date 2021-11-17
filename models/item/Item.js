
class Item {
    color = []
    #table = 'item'

    constructor({
        id,
        idVendor,
        idFamily,
        idPlace,
        itemCode,
        name,
        priceVATout,
        priceVATin,
        cost,
        maximumCost,
        minimumStock,
        stock,
        itemType,
        description,
        show,
        imgUrl,
        color = []
    }) {
        this.id = id
        this.idVendor = idVendor
        this.idFamily = idFamily
        this.idPlace = idPlace
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
        this.show = show
        this.imgUrl = imgUrl
        this.color = color
    }
    get table() {
        return this.#table;
    }
}
module.exports = Item