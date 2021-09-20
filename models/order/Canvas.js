class Canvas {
    #table = 'orders_canvas'

    constructor({
        id,
        idElemento,
        name,
        x,
        y,
        idOrder,
        imgUrl
    }) {
        this.id = id
        this.idElemento = idElemento
        this.name = name
        this.x = x
        this.y = y
        this.idOrder = idOrder
        this.imgUrl = imgUrl
    }
    get table() {
        return this.#table;
    }
}
module.exports = Canvas