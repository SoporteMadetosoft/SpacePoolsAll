import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const verify = async (endPoint, id = null, form) => {

    console.log(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/verify`)
    await axios.put(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/verify`, { form })

}