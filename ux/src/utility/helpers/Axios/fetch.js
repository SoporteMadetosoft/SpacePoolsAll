import axios from "axios"

export const fetch = async (endPoint, params, method = 'GET') => {
    const token = localStorage.getItem('accessToken') || ''
    
    const {data: {data}} = await axios(`${process.env.REACT_APP_HOST_URI}${endPoint}`, {
        method,
        data: params,
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        }
    })
    
    return data
}