import axios from "axios"
import { endPoints } from "@fixed/endPoints"
import { saveLog } from "./saveLog"

export const verify = async (endPoint, id = null, form) => {
    const token = localStorage.getItem('accessToken') || ''

    console.log(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/verify`)
    await axios.put(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/verify`, { form }, {
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        }
    })
    await saveLog(endPoint, 3)

}