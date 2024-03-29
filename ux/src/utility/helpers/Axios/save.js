import axios from "axios"
import { endPoints } from "@fixed/endPoints"
import { saveLog } from "./saveLog"

export const save = async (endPoint, id = null, form) => {
    const token = localStorage.getItem('accessToken') || ''
    if (id) {
        await axios.put(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/update`, { form }, {
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            }
        })

        await saveLog(endPoint, 1)

    } else {
        await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/insert`, { form }, {
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            }
        })
        await saveLog(endPoint, 0)
    }

}