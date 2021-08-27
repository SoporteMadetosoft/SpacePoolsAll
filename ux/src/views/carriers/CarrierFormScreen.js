import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'
import { save } from '../../utility/helpers/Axios/save'
import { CarriersForm } from './carriersForm/CarriersForm'
import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'
import { FileContext } from './carriersForm/FileContext'
import { handleCleanUp, saveFiles } from '../../redux/actions/fileUpload'
import { MkDir } from '../../utility/helpers/MkDir'

const structureForm = {
    documents: []
}

export const CarrierFormScreen = () => {

    const dispatch = useDispatch()
    const { id } = useParams()
    const history = useHistory()

    const [file, setFile] = useState('')
    const form = useSelector(state => state.normalForm)
    const { upload, filePath } = useSelector(state => state.fileUpload)

    const titulo = (id) ? 'Editar Transportista' : 'Añadir Transportista'

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Carriers', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const filePath2 = await MkDir(filePath)

        if (upload) {
            dispatch(await saveFiles('Carriers', filePath2, file))
        }

        const prettyForm = {
            ...form,
            filePath: filePath2
        }

        save('Carriers', id, prettyForm)
        dispatch(handleCleanUp())
        history.push('/carriers')
    }

    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Transportista' breadCrumbActive={titulo} />
            <FileContext.Provider value={{ file, setFile }}>
                <CarriersForm />
            </FileContext.Provider>
            <ActionButtons />
        </form>
    )
}
