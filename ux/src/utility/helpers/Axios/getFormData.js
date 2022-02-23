import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const getFormData = async (endPoint, id) => {
    const token = localStorage.getItem('accessToken')

    const { data } = await axios.get(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/${id}`, {
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        }
    })

    return data
}