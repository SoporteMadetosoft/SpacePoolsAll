const ProductFamily = require("../../models/item/ProductFamily");
const GenericDao = require("../GenericDao");

class ProductFamilyDao extends GenericDao {

    constructor() {
        super(ProductFamily);
         }

    findAllFamily(idNode) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM item_product_family WHERE parent IS NULL`, async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let treeData = [{
                        value: null,
                        label: 'Nadie'
                    }]
                    for (const res of result) {
                        if (parseInt(idNode) !== res.id) {
                            treeData.push({
                                value: res.id,
                                label: `${res.id} - ${res.name}`,
                                children: await this.findChilds(res.id, idNode)
                            })
                        }
                    }
                    resolve(treeData)
                }
            });
        })
    }

    findChilds(id, idNode) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM item_product_family WHERE parent = ?`, id, async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    if (result.length > 0) {
                        let childs = []
                        for (const res of result) {
                            if (parseInt(idNode) !== res.id) {
                                childs.push({
                                    value: res.id,
                                    label: `${res.id} - ${res.name}`,
                                    children: await this.findChilds(res.id, idNode)
                                })
                            }
                        }
                        resolve(childs)
                    } else {
                        resolve('')
                    }
                }
            });
        })
    }

    setParentNullById(id) {
        // console.log(`UPDATE item_product_family SET parent = null WHERE id = ${id}`)

        return new Promise((resolve, reject) => {
            this.db.query(`UPDATE item_product_family SET parent = null WHERE id = ?`, id, async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('')
                }
            });
        })
    }

    setParentNullByParent(parent) {
        return new Promise((resolve, reject) => {
            this.db.query(`UPDATE item_product_family SET parent = null WHERE parent = ?`, parent, async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('')
                }
            });
        })
    }


    async mountObj(data) {

        const productFamily = {
            ...data,
        }

        return new ProductFamily(productFamily)
    }

    async mountList(data) {
        const { name: parentName } = await this.findById(data.parent)
        const list = {
            ...data,
            parent: parentName ? parentName : 'Nadie'
        }
        const nObj = list
        return nObj
    }

}

module.exports = ProductFamilyDao