const ItemColors = require("../../models/item/ItemColors");
const GenericDao = require("../GenericDao");

class ItemsColorsDao extends GenericDao {
    constructor() {
        super(ItemColors)
    }

    async mountObj(data) {
        return new ItemColors(data)
    }


}
module.exports = ItemsColorsDao