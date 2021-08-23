const Purchase = require("../../models/purchase/Purchase");
const GenericDao = require("../GenericDao");

const ItemDao = require("../purchase/ItemDao");

class PurchaseDao extends GenericDao {
    ItemDao
    constructor() {
        super(Purchase);
        this.ItemDao = new ItemDao()
    }

    async mountObj(data) {
        
        const purchase = {
            ...data,
            items: await this.ItemDao.findByPurchaseId(data.id)
        }
        console.log(purchase)
        return new Purchase(purchase)
    }

    async mountList(data) {
        const list = {
            ...data,
        }
        const{vendorid, purchaseDate, observations} =list
        const nObj = {vendorid :vendorid, purchaseDate :purchaseDate, observations: observations}
        return nObj
    }

    getSelect() {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM ??', [this.objectAux.table], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let objList = []
                    for (const res of result) {
                        objList.push(await this.mountSelect(res))
                    }

                    resolve(objList)
                }
            });
        })
    }
    
    async mountSelect(data){
        return await this.createSelect(data)
        
    }

    
    findByVendorId (id) {
        return new Promise((resolve, reject) => { 
            this.db.query('SELECT * FROM purchases WHERE vendorId = ?', [id], (err, result) => {
                if(err){ 
                    reject(err)
                }else{
                    const adressesList = []
                    for(const centerDB of result){
                        adressesList.push(this.mountObj(centerDB))
                    }
                  
                    resolve(adressesList)
                }
            })
        })
    }

}

module.exports = PurchaseDao