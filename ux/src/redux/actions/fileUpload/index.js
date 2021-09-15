import { handleConfirmCancel } from '@helpers/handleConfirmCancel'
import { loadFiles } from "../../../utility/helpers/Axios/loadFiles"
import { fileUploadTypes } from "../../types/fileUpload/types"
import { uploadFile } from "../../../utility/helpers/Axios/uploadFile"
import { eraseFile } from '../../../utility/helpers/Axios/deleteFile'
import { addRepeaterRegister, handleCleanSection, removeRepeaterRegister } from '../normalForm'

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

export const startDeleteFile = (position, url) => {
    return async (dispatch) => {
        const respuesta = await handleConfirmCancel()
        if (respuesta === true) {
            dispatch(removeRepeaterRegister('documents', position))
            await eraseFile(url, 'FileManager')
        }
    }
}

export const saveFiles = async (endpoint, filePath, files) => {
    return async (dispatch) => {
        const formData = new FormData()
        formData.append('filePath', filePath)

        for (const element of files) {

            formData.append('file', element)
        }

        await uploadFile(endpoint, formData)

        dispatch(handleChangeDestination(filePath))
        dispatch(handleChangeUpload(0))
    }
}

export const handleLoadDocuments = (endpoint, filePath) => {
    return async (dispatch) => {
        if (filePath !== null) {
            const data = await loadFiles(endpoint, filePath)
            dispatch(handleCleanSection('documents'))
            data.map(
                document => (
                    dispatch(addRepeaterRegister('documents', document))
                )
            )
        }
    }
}