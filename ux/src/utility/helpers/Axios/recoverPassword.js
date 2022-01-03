import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const recoverPassword = async (endPoint, form) => {
    await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/recoverPassword`, { form })
}