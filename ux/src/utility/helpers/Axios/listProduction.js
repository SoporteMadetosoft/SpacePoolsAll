import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const listProduction = async (endPoint, productionStatus) => {
    const token = localStorage.getItem('accessToken') || ''

    console.log(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/list/${productionStatus}`)
    const { data } = await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/list`, { productionStatus }, {
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        }
    })

    return data.data
}