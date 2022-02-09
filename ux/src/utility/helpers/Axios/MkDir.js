import axios from "axios"

export const MkDir = async (endpoint, filePath) => {
    const dirname = !!filePath ? filePath : `${endpoint}/${Date.now()}`
    const token = localStorage.getItem('accessToken') || ''

    await axios.post(`${process.env.REACT_APP_HOST_URI}/global/fileManager/create`, { filePath: dirname }, {
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        }
    })

    return dirname
}