import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const sendEmail = async (endPoint, form) => {
    console.log(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/send`, form)
    const data = await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/send`, { form })
    console.log(data)
}