import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const getEvents = async (endPoint, calendars) => {
    console.log(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/getEvents/${calendars}`)
    const { data } = await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/getEvents`, { calendars })

    return data.data
}