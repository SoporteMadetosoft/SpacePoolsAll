import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'
import { save } from '../../utility/helpers/Axios/save'
import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'
import { handleCleanUp } from '../../redux/actions/fileUpload'
import { ItemForm } from './itemForm/ItemForm'
import { exceptionController } from '../../utility/helpers/undefinedExceptionController'

const structureForm = {}

export const ItemFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Items', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const titulo = (id) ? 'Editar Artículo' : 'Añadir Artículo'
    const customerName = (form.name) ? form.name : titulo

    const handleSubmit = async (e) => {
        e.preventDefault()

        const prettyForm = {
            ...form,
            itemType: exceptionController(form.itemType),
            family: exceptionController(form.family),
            place: exceptionController(form.place)
        }

        save('Items', id, prettyForm)
        dispatch(handleCleanUp())
        history.push('/items')
    }

    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Artículos' breadCrumbActive={titulo} />
            <ItemForm />
            <ActionButtons />
        </form>
    )
}
