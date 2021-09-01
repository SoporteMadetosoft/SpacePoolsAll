import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'
import { save } from '../../utility/helpers/Axios/save'
import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'
import { handleCleanUp } from '../../redux/actions/fileUpload'
import { ItemsFamilyForm } from './itemsFamilyForm/ItemsFamilyForm'

const structureForm = {}

export const ItemsFamilyFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Family', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const titulo = (id) ? 'Editar Familia' : 'Añadir Familia'
    const customerName = (form.name) ? form.name : titulo

    const handleSubmit = async (e) => {
        e.preventDefault()

        save('Family', id, form)
        dispatch(handleCleanUp())
        history.push('/pools')
    }

    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Familias' breadCrumbActive={titulo} />
            <ItemsFamilyForm />
            <ActionButtons />
        </form>
    )
}
