import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const eraseFile = async (url, endPoint) => {
    console.log(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/delete/${url}`)
    await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/delete`, { url })

}