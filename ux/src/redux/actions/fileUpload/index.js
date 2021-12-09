import { handleDeleteConfirmation } from '@helpers/handleDeleteConfirmation'
import { loadFiles } from "../../../utility/helpers/Axios/loadFiles"
import { fileUploadTypes } from "../../types/fileUpload/types"
import { uploadFile } from "../../../utility/helpers/Axios/uploadFile"
import { deleteFile } from '../../../utility/helpers/Axios/deleteFile'
import { addRepeaterRegister, handleCleanSection, removeRepeaterRegister } from '../normalForm'
import { types } from "@redux/types/types"


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

export const startDeleteFile = (position, url, id) => {
    return async (dispatch) => {
        const respuesta = await handleDeleteConfirmation()
        if (respuesta === true) {
            dispatch(removeRepeaterRegister('documents', position))
            dispatch({
                type: types.delete,
                payload: id
            })
            await deleteFile('FileManager', url)
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
    return async (dispatch, getState) => {
        if (filePath !== null) {
            const data = await loadFiles(endpoint, filePath)
            const oldDocuments = getState().normalForm.documents
            dispatch(handleCleanSection('documents'))

            data.map(
                document => {
                    const comun = oldDocuments.filter((od) => (od.url === document.url))

                    const obj = {
                        ...document,
                        expiration: comun[0] !== undefined ? comun[0].expiration : '',
                        name: comun[0] !== undefined ? comun[0].name : ''
                    }

                    dispatch(addRepeaterRegister('documents', obj))
                }
            )
        }
    }
}