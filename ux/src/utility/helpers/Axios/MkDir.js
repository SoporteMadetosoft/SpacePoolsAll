import axios from "axios"

export const MkDir = (endpoint, filePath) => {
    let dirname = ''
    if (filePath === null || filePath === undefined) {
        dirname = `${endpoint}/${Date.now()}`
    } else {
        dirname = filePath
    }

    console.log(`${process.env.REACT_APP_HOST_URI}/global/fileManager/create / ${dirname}`)
    axios.post(`${process.env.REACT_APP_HOST_URI}/global/fileManager/create`, { filePath: dirname })

    return dirname
}