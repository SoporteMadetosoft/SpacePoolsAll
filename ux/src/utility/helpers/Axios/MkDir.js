import axios from "axios"

export const MkDir = async (filePath) => {
    let dirname = ''
    if (filePath === null || filePath === undefined) {
        dirname = Date.now()
    } else {
        dirname = filePath
    }

    console.log(`${process.env.REACT_APP_HOST_URI}/global/fileManager/create / ${dirname}`)
    await axios.post(`${process.env.REACT_APP_HOST_URI}/global/fileManager/create`, { filePath: dirname })

    return dirname
}