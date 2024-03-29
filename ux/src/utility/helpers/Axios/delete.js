import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const erase = async (id, endPoint) => {
    const token = localStorage.getItem('accessToken') || ''

    await axios.delete(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/delete/${id}`, {
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        }
    })
}