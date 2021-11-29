import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const switchStart = async (id, endPoint) => {
    await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/switchStart/${id}`)
}