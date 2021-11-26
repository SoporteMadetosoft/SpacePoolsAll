import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const switchStart = async (id, endPoint) => {
    await axios.delete(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/switchStart/${id}`)
}