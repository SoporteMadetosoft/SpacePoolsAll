import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const getSetupSelectList = async (endPoint) => {
    console.log(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/select`)
    const { data } = await axios.get(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/select`)

    return data.data
}