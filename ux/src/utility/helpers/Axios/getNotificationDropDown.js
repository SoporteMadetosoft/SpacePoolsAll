import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const getNotificationDropDown = (endPoint) => {
  return new Promise(async (resolve, reject) => {
    const { data: dataSnap } = await axios.get(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/listNotification`)
    const data = []
    dataSnap.data.forEach(element => {
      data.push({
        subtitle: element.date,
        title: element.message
      })
    })
    resolve(data)
  })


}