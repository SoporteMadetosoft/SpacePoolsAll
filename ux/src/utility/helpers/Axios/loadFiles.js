import axios from "axios"

export const loadFiles = async (filePath) => {

    console.log(`${process.env.REACT_APP_HOST_URI}/global/fileManager/load / ${filePath}`)
    const { data } = await axios.post(`${process.env.REACT_APP_HOST_URI}/global/fileManager/load`, { filePath })
    return data.data
}