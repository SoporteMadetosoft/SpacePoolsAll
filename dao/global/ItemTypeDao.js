const ItemType = require("../../models/global/ItemType");
const SetupDao = require("../setup/SetupDao");

class ItemTypeDao extends SetupDao {
    constructor() {
        super(ItemType)
    }
}
module.exports = ItemTypeDao