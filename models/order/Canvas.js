class Canvas {
    #table = 'orders_canvas'

    constructor({
        id,
        idElemento,
        name,
        x,
        y,
        idOrder,
        width,
        height,
        rotation
    }) {
        this.id = id
        this.idElemento = idElemento
        this.name = name
        this.x = x
        this.y = y
        this.idOrder = idOrder
        this.width = width
        this.height = height
        this.rotation = rotation
    }
    get table() {
        return this.#table;
    }
}
module.exports = Canvas