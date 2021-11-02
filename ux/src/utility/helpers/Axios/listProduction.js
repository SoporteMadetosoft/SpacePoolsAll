import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const listProduction = async (endPoint, productionStatus) => {
    console.log(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/list/${productionStatus}`)
    const { data } = await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/list`, { productionStatus })

    return data.data
}