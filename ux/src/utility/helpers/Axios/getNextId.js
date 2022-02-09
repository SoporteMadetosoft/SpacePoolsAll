import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const getNextId = async (endPoint) => {
    const token = localStorage.getItem('accessToken') || ''

    const { data: { data } } = await axios.get(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/findnid`, {
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        }
    })

    return data[0].AUTO_INCREMENT
}
