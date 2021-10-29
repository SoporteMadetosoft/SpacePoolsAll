import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const listDelivery = async (endPoint, idUser) => {
    console.log(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/list/${idUser}`)
    const { data } = await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/list`, { idUser })

    return data.data
}