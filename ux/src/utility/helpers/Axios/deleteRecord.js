import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const deleteRecord = async (id, endPoint) => {
    console.log(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/delete/${id}`)
    await axios.delete(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/delete/${id}`)

}