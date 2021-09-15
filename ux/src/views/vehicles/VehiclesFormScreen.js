import React, { useEffect, useState } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { VechiclesForm } from './vehiclesForm/VehiclesForm'
import { ActionButtons } from '../../components/actionButtons/ActionButtons'
import { addRepeaterRegister, handleGetForm, handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'

import { exceptionController } from '../../utility/helpers/undefinedExceptionController'
import { save } from '../../utility/helpers/Axios/save'
import { SwalUploadAndSave } from '../../utility/helpers/SwalUploadAndSave'
import { uploadFile } from '../../utility/helpers/Axios/uploadFile'
import { handleChangeDestination, handleChangeUpload, handleCleanUp } from '../../redux/actions/fileUpload'
import { loadFiles } from '../../utility/helpers/Axios/loadFiles'
import { MkDir } from '../../utility/helpers/Axios/MkDir'
import { FileContext } from '../../utility/context/FileContext'

const structureForm = {
    documents: []
}

export const VehiclesFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [file, setFile] = useState('')
    const form = useSelector(state => state.normalForm)
    const { upload, filePath } = useSelector(state => state.fileUpload)

    const realFilePath = form.filePath ? form.filePath : filePath

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Vehicles', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const title = (id) ? 'Editar Vehículo' : 'Añadir Vehículo'
    const customName = (form.plateNumber) ? form.plateNumber : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Vehículos' breadCrumbActive={title} />
            <VechiclesForm />
        </>
    )
}
