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


