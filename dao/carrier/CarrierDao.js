const Carrier = require("../../models/carrier/Carrier");
const GenericDao = require("../GenericDao");

const StatusDao = require("../global/StatusDao");

class CarrierDao extends GenericDao{
    StatusDao

    constructor(){
        super(Carrier);
        this.StatusDao = new StatusDao()
    }

    async mountObj(data){
        const status = await this.StatusDao.findById(data.status)
        
        const carrier={
            ...data,
            status: await this.createSelect(status.base)
        }
        console.log(carrier)
        return new Carrier(carrier)
    }

    async mountList(data){
        const list = {
            ...data,
        }
        const{ id, carrierCode, name, NIF, email, phone, phone2, status}=list
        const nObj = {id: id, carrierCode:carrierCode, name:name, NIF:NIF, email:email, phone:phone, phone2:phone2, status:status}
        return nObj
    }
}   
module.exports = CarrierDao