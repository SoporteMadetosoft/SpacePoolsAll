const Calendar = require("../../models/calendar/Calendar");

const GenericDao = require("../GenericDao");

class CalendarDao extends GenericDao {
    constructor() {
        super(Calendar);
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
        const events = {
            ...data,
            allDay: !!data.allDay,
            extendedProps: {
                calendar: data.calendar
            }
        }
        const { id, url, title, start, end, allDay, extendedProps } = events
        const nObj = { id: id, url: url, title: title, start: start, end: end, allDay: allDay, extendedProps: extendedProps }
        return nObj
    }
}
module.exports = CalendarDao