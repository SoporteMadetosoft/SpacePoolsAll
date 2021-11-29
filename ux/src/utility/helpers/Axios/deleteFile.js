import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const deleteFile = async (url, endPoint) => {
    const token = localStorage.getItem('accessToken') || ''

    await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/delete`, { url }, {
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        }
    })

}