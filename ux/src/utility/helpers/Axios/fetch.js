import axios from "axios"
import { endPoints } from "@fixed/endPoints"

export const fetch = async (endPoint, id = null, params = null, method = 'GET') => {
    const token = localStorage.getItem('accessToken') || ''
    let url = `${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}`

    if (id) {
        method = method === 'POST' ? 'PUT' : method
        url += `/${id}`
    }

    const { data } = await axios(url, {
        method,
        data: { ...params },
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        }
    })
    return data


}