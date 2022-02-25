import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const erase = async (id, endPoint) => {
    await axios.delete(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/${id}`)
}