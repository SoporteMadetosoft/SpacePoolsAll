import axios from "axios"
import { endPoints } from "@fixed/endPoints"
import Media from "reactstrap/lib/Media"

export const getNotificationDropDown = (endPoint) => {
  return new Promise(async (resolve, reject) => {
    console.log(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/listNotification`)
    const { data: dataSnap } = await axios.get(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/listNotification`)
    const data = []
    dataSnap.data.forEach(element => {
      // console.log(element.date, element.message)
        data.push({
            subtitle: element.date,
            title: element.message
          })
    })
    resolve(data)
  })
    
 
}