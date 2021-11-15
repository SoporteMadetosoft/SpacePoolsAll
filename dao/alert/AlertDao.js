const GenericDao = require("../GenericDao");
const Alert = require("../../models/alert/Alert");

let status;
class AlertDao extends GenericDao {
    constructor() {
        super(Alert);

    }


    async mountList(data) {

        const newDate = this.datetimeToEuropeDate(new Date(data.date))
        const nObj = {
            id: data.id,
            message: data.message,
            date: newDate,
            isDone: data.isDone

        }

        return nObj
    }

    async listNotification() {
        const d = new Date()
        const fechaActual = await this.datetimeToDate(new Date(d))
        var fechaLimite = await this.datetimeToDate(new Date(new Date(fechaActual).setMonth(new Date(fechaActual).getMonth() + 1)))



        var newDateActual = "'" + fechaActual.toLocaleString() + "'"
        var newDateLimite = "'" + fechaLimite.toLocaleString() + "'"


        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM alerts WHERE date BETWEEN ${newDateActual} AND ${newDateLimite} AND isDone = 0`, async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let objList = []
                    for (const res of result) {
                        objList.push(await this.mountList(res))
                    }
                    resolve(objList)
                }
            })
        })
    }
}
module.exports = AlertDao