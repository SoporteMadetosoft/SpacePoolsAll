import axios from "axios"

export const MkDir = async (filePath) => {
    let dirname = ''

    if (filePath === null) {
        dirname = Date.now()
    } else {
        dirname = filePath
    }

    console.log(`${process.env.REACT_APP_HOST_URI}/global/mkdir/mkdir / ${dirname}`)
    await axios.post(`${process.env.REACT_APP_HOST_URI}/global/mkdir/mkdir`, { filePath: dirname })

    return dirname
}