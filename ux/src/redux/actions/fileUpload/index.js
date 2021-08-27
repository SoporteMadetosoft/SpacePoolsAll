import { fileUploadTypes } from "../../types/fileUpload/types"
import { uploadFile } from "../../../utility/helpers/Axios/uploadFile"
import { SwalUploadAndSave } from "../../../utility/helpers/SwalUploadAndSave"
import { handleChangeController } from "../normalForm"

export const handleChangeUpload = (upload) => ({
    type: fileUploadTypes.SetUpload,
    payload: upload
})

export const handleChangeDestination = (upload) => ({
    type: fileUploadTypes.SetDestination,
    payload: upload
})

export const handleCleanUp = () => ({
    type: fileUploadTypes.CleanUp
})

export const saveFiles = async (endpoint, filePath, files, upload) => {
    return async (dispatch) => {

        let doIt = 0
        if (upload === 1) {
            const swalResp = await SwalUploadAndSave()
            if (swalResp === true) {
                doIt = 1
            }
        } else {
            doIt = 1
        }

        if (doIt === 1) {
            const formData = new FormData()
            formData.append('filePath', filePath)

            for (const element of files) {

                formData.append('file', element)
            }

            const respuesta = await uploadFile(endpoint, formData)

            dispatch(handleChangeDestination(respuesta.filePath))
            dispatch(handleChangeUpload(0))
        }
    }
}