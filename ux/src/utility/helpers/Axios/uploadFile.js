import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const uploadFile = async (endPoint, formData) => {
    const token = localStorage.getItem('accessToken') || ''

    await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'x-token': token
        }
    })
}