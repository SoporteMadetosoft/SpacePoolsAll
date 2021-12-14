class ItemColors {

    #table = 'item2'
    color = []

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
        imgUrl,
        color = []
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
        this.color = color
    }
    get table() {
        return this.#table;
    }
}
module.exports = ItemColors