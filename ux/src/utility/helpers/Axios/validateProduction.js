import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const validateProduction = async (endPoint, form) => {
    const token = localStorage.getItem('accessToken') || ''

    const { data } = await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/validate`, { form }, {
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        }
    })
    return data.data
}