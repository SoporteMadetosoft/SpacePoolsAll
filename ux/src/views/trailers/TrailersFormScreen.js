import React, { useEffect, useState } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'
import { addRepeaterRegister, handleGetForm, handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'
import { save } from '../../utility/helpers/Axios/save'
import { TrailersForm } from './trailersForm/TrailersForm'
import { startAddSelectOptions } from '../../redux/actions/selects'
import { exceptionController } from '../../utility/helpers/undefinedExceptionController'
import { SwalUploadAndSave } from '../../utility/helpers/SwalUploadAndSave'
import { uploadFile } from '../../utility/helpers/Axios/uploadFile'
import { handleChangeDestination, handleChangeUpload, handleCleanUp } from '../../redux/actions/fileUpload'
import { loadFiles } from '../../utility/helpers/Axios/loadFiles'
import { FileContext } from '../../utility/context/FileContext'
import { MkDir } from '../../utility/helpers/Axios/MkDir'

const structureForm = {
    documents: []
}

export const TrailersFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [file, setFile] = useState('')
    const form = useSelector(state => state.normalForm)
    const { upload, filePath } = useSelector(state => state.fileUpload)

    const realFilePath = form.filePath ? form.filePath : filePath

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Trailers', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const title = (id) ? 'Editar Remolque' : 'Añadir Remolque'
    const customerName = (form.plate) ? form.plate : title

    const preSubmit = (filePath2) => {
        return new Promise(async (resolve, reject) => {
            if (upload === 1) {
                const swalResp = await SwalUploadAndSave()
                if (swalResp === true) {
                    const formData = new FormData()
                    formData.append('filePath', filePath2)

                    for (const element of file) {

                        formData.append('file', element)
                    }

                    await uploadFile('FileManager', formData)

                    dispatch(handleChangeDestination(filePath2))
                    dispatch(handleChangeUpload(0))
                    const data = await loadFiles('FileManager', filePath2)
                    await data.map(
                        document => (
                            dispatch(addRepeaterRegister('documents', document))
                        )
                    )
                }
            }
            resolve('')
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const filePath2 = MkDir('Trailers', realFilePath)
        await preSubmit(filePath2)

        const form2 = dispatch(handleGetForm())
        form2.then(async (value) => {
            const prettyForm = {
                ...value,
                idStatus: exceptionController(value.idStatus),
                model: exceptionController(value.model),
                filePath: filePath2
            }

            save('Trailers', id, prettyForm)
            dispatch(handleCleanUp())
            history.push('/porters/trailers')
        })

    }

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Remolques' breadCrumbActive={title} />
            <form onSubmit={handleSubmit}>
                <FileContext.Provider value={{ file, setFile }}>
                    <TrailersForm />
                </FileContext.Provider>
                <ActionButtons />
            </form>
        </>
    )
}
