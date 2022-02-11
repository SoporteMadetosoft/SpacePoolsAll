import { loadFiles } from "../../../utility/helpers/Axios/loadFiles"
import { uploadFile } from "../../../utility/helpers/Axios/uploadFile"
import { SwalUploadAndSave } from "../../../utility/helpers/SwalUploadAndSave"


export const preSubmit = async (filePath2, upload, files, oldDocuments) => {
    if (upload === 1) {
        const swalResp = await SwalUploadAndSave()
        if (swalResp) {
            const formData = new FormData()
            formData.append('filePath', filePath2)

            Object.entries(files).map(([, file]) => { formData.append('file', file) })
            await uploadFile('FileManager', formData)
            const data = await loadFiles('FileManager', filePath2)

            const totalData = data.map(
                document => {
                    return {
                        ...oldDocuments.find((od) => (od.url === document.url)),
                        ...document
                    }
                }
            )
            return totalData
        }
    }
    return oldDocuments
}