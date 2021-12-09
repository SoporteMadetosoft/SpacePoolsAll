const Calendar = require("../../models/calendar/Calendar");

const GenericDao = require("../GenericDao");
const OrderDao = require('../order/OrderDao');

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
        //const prod = await this.OrderDao.findOrderById(data.id)
        const events = {
            ...data,
            allDay: !!data.allDay,
            extendedProps: {
                calendar: data.calendar
            },
            //start : prod !== undefined ? prod.productionDate : '',
            //end : prod !== undefined ? prod.deliveryDate : ''
        }
        const { id, url, title, start, end, allDay, extendedProps } = events
        const nObj = { id: id, url: url, title: title, start: start, end: end, allDay: allDay, extendedProps: extendedProps }
        return nObj
    }
}
module.exports = CalendarDao