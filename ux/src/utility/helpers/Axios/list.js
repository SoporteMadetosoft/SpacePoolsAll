import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const list = async (endPoint) => {
    console.log(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/list`)
    const { data: dataSnap } = await axios.get(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/list`)
    const data = []
    dataSnap.data.forEach(element => {
        data.push({
            ...element
        })
    })

    return data
}