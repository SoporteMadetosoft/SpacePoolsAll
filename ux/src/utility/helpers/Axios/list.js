import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const list = async (endPoint) => {
    const token = localStorage.getItem('accessToken') || ''

    const { data: dataSnap } = await axios.get(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/list`, {
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        }
    })
    const data = []
    dataSnap.data.forEach(element => {
        data.push({
            ...element
        })
    })

    return data
}