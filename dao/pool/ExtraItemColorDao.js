const PoolExtraItemsColors = require("../../models/pool/PoolExtraItemsColors");
const GenericDao = require("../GenericDao");
const ItemsColorsDao = require("../item/ItemColorsDao");


class ExtraItemColorDao extends GenericDao {
    constructor() {
        super(PoolExtraItemsColors);
        this.ItemsColorsDao = new ItemsColorsDao()
    }

    async mountObj(data) {
        const colData = await this.ItemsColorsDao.findByItemId(data.idItem)
        const colores = colData.map(el => ({
            label: el.name,
            value: el.id
        }))
        const selectedColor = await this.ItemsColorsDao.ColorsDao.findById(data.idColor)
        const extraItem = {
            ...data,
            idItem: await this.ItemColorsDao.findById(data.idItem),
            coste: await this.ItemColorsDao.findOneFieldById("cost", data.idItem),
            idColor: selectedColor.id !== undefined ? selectedColor : '',
            colores: colores
        }

        return extraItem
    }

    async mountList(data) {
        const list = {
            ...data

        }
        const { idItem, coste ,idColor, colores } = list
        const nObj = { idItem: idItem, coste: coste, idColor: idColor, colores: colores }
        return nObj
    }
}

module.exports = ExtraItemColorDao