import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'
import { save } from '../../utility/helpers/Axios/save'
import { CarriersForm } from './carriersForm/CarriersForm'
import { addRepeaterRegister, handleGetForm, handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'
import { handleChangeDestination, handleChangeUpload, handleCleanUp } from '../../redux/actions/fileUpload'
import { MkDir } from '../../utility/helpers/Axios/MkDir'
import { exceptionController } from '../../utility/helpers/undefinedExceptionController'
import { SwalUploadAndSave } from '../../utility/helpers/SwalUploadAndSave'
import { loadFiles } from '../../utility/helpers/Axios/loadFiles'
import { uploadFile } from '../../utility/helpers/Axios/uploadFile'
import { FileContext } from '../../utility/context/FileContext'

const structureForm = {
    documents: []
}

export const CarrierFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [file, setFile] = useState('')
    const form = useSelector(state => state.normalForm)
    const { upload, filePath } = useSelector(state => state.fileUpload)

    const realFilePath = form.filePath ? form.filePath : filePath
    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Carriers', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const titulo = (id) ? 'Editar Transportista' : 'Añadir Transportista'
    const customerName = (form.name) ? form.name : titulo

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
        const filePath2 = MkDir('Carriers', realFilePath)

        await preSubmit(filePath2)

        const form2 = dispatch(handleGetForm())
        form2.then(async (value) => {
            const prettyForm = {
                ...value,
                idStatus: exceptionController(value.idStatus),
                filePath: filePath2
            }
            await save('Carriers', id, prettyForm)
            dispatch(handleCleanUp())
            history.push('/porters/carriers')
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Transportista' breadCrumbActive={titulo} />
            <FileContext.Provider value={{ file, setFile }}>
                <CarriersForm />
            </FileContext.Provider>
            <ActionButtons />
        </form>
    )
}
