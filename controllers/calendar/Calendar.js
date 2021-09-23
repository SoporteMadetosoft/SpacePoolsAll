
const CalendarDao = require('../../dao/calendar/CalendarDao');

const calendarDao = new CalendarDao()

exports.getEvents = async (req, res) => {
    const calendars = req.body.calendars;
    if (calendars.length > 0) {
        try {
            res.json({
                ok: true,
                data: await calendarDao.getEvents(calendars)
            })

        } catch (error) {
            console.log(error)
            return res.status(500).send(error);
        }
    } else {
        console.log('No hay calendarios seleccionados')
        res.json({
            ok: true,
            data: []
        })
    }
}
