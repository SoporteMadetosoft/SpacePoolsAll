import axios from "axios"
import { endPoints } from "@fixed/endPoints"
import Media from "reactstrap/lib/Media"

export const getCurrentDate = (separator = '') => {
    
    const newDate = new Date()
    const date = newDate.getDate()
    const month = newDate.getMonth() + 1
    const year = newDate.getFullYear()
    
    return (
        `${date} ${separator} ${month < 10 ? `0${month}` : `${month}`} ${separator} ${year}`
        )
    }

export const getNotificationMinimStock = (endPoint) => {
    
  return new Promise(async (resolve, reject) => {
      
    console.log(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/comprobacionStock`)
    const { data: dataSnap } = await axios.get(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/comprobacionStock`)
    const data = []
    dataSnap.data.forEach(element => {
      // console.log(element.date, element.message)
        data.push({
            subtitle: getCurrentDate('/'),
            title: `El stock de ${element.name} está a punto de agotarse`
          })
    })
    resolve(data)
  })

  
    
 
}

