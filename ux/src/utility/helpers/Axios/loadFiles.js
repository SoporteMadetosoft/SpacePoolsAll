import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const loadFiles = async (endPoint, filePath) => {

    console.log(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/load/${filePath}`)
    const { data } = await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/load`, { filePath })
    return data.data
}