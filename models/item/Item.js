
class Item {
    #table = 'item'

    constructor({
        id,
        idVendor,
        idFamily,
        idPlace,
        itemCode,
        name,
        name_fr,
        priceVATout,
        priceVATin,
        cost,
        maximumCost,
        minimumStock,
        stock,
        itemType,
        description,
        show,
        imgUrl
    }) {
        this.id = id
        this.idVendor = idVendor
        this.idFamily = idFamily
        this.idPlace = idPlace
        this.itemCode = itemCode
        this.name = name
        this.name_fr = name_fr
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
    }
    get table() {
        return this.#table;
    }
}
module.exports = Item