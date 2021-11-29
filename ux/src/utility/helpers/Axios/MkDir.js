import axios from "axios"

export const MkDir = (endpoint, filePath) => {
    let dirname = ''
    if (filePath === null || filePath === undefined) {
        dirname = `${endpoint}/${Date.now()}`
    } else {
        dirname = filePath
    }

    const token = localStorage.getItem('accessToken') || ''

    axios.post(`${process.env.REACT_APP_HOST_URI}/global/fileManager/create`, { filePath: dirname }, {
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        }
    })

    return dirname
}