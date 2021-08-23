import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const save = async (endPoint, id = null, form) => {
    if (id) {
        console.log(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/update`)
        await axios.put(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/update`, {form})
    } else {
        console.log(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/insert`)
        await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/insert`, {form})
    }
}