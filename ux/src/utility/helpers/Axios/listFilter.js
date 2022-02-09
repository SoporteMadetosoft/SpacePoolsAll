import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const listFilter = async (endPoint, form) => {

    const token = localStorage.getItem('accessToken') || ''
    return await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/listFilter`, { form }, {
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        }
    })
}