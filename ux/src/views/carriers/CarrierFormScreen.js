import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'
import { save } from '../../utility/helpers/Axios/save'
import { CarriersForm } from './carriersForm/CarriersForm'
import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'
import { FileContext } from './carriersForm/FileContext'
import { handleCleanUp, handleLoadDocuments, saveFiles } from '../../redux/actions/fileUpload'
import { MkDir } from '../../utility/helpers/Axios/MkDir'
import { startAddSelectOptions } from '../../redux/actions/selects'

const structureForm = {}

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const filePath2 = await MkDir(realFilePath)
        if (upload) {
            dispatch(await saveFiles('Carriers', filePath2, file))
        }

        const prettyForm = {
            ...form,
            idStatus: form.idStatus.value,
            filePath: filePath2
        }

        save('Carriers', id, prettyForm)
        dispatch(handleCleanUp())
        dispatch(startAddSelectOptions('/carriers', 'carriersOpt'))
        history.push('/porters/carriers')
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
