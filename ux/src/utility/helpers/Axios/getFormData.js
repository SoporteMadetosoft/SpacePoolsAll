import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const getFormData = async (endPoint, id) => {
    const token = localStorage.getItem('accessToken')

    console.log(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/find/${id}`)
    const { data } = await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/find`, { id }, {
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        }
    })
    return data.data
}