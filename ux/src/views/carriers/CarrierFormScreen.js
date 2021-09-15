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


    return (
        <>
            <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Transportista' breadCrumbActive={titulo} />
            <CarriersForm />
        </>
    )
}
