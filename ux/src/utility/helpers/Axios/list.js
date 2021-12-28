import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const list = async (endPoint) => {
    const token = localStorage.getItem('accessToken') || ''

    return await axios.get(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/list`, {
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        }
    })
        .then((response) => {

            const data = []
            response.data.data.forEach(element => {
                data.push({
                    ...element
                })
            })
            return data
        })
        .catch((thrown) => {
            if (axios.isCancel(thrown)) {
                console.log('Request canceled', thrown.message)
            } else {

            }
            return []
        })
}