const Calendar = require("../../models/calendar/Calendar");

const GenericDao = require("../GenericDao");
const OrderDao = require("../order/OrderDao");

class CalendarDao extends GenericDao {
    constructor() {
        super(Calendar);
        this.OrderDao = new OrderDao()
    }

    getEvents(calendars) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM events WHERE calendar IN (?) ', [calendars], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let CalendarList = []
                    for (const data of result) {
                        const obj = await this.mountList(data)

                        CalendarList.push(obj)

                    }
                    resolve(CalendarList)
                }
            })
        })
    }


    async mountList(data) {
        const startC = await this.OrderDao.findOrderById(data.id)
        const endCal = await this.OrderDao.findOrderById(data.id)
        const events = {
            ...data,
            allDay: !!data.allDay,
            extendedProps: {
                calendar: data.calendar
            },
            startD : startC !== undefined ? startC.productionDate : '',
            endC : endCal !== undefined ? endCal.deliveryDate : ''
        }
        const { id, url, title, startD, endC, allDay, extendedProps } = events
        const nObj = { id: id, url: url, title: title, start: startD, end: endC, allDay: allDay, extendedProps: extendedProps }
        return nObj
    }
}
module.exports = CalendarDao