import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'
import { ItemForm } from './itemForm/ItemForm'

const structureForm = {}

export const ItemFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        //dispatch(startAddSelectStatus('Vendors','Vendors','comercialName'))

        if (id) {
            dispatch(handleStartEditing('Items', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const titulo = (id) ? 'Editar Artículo' : 'Añadir Artículo'
    const customerName = (form.name) ? form.name : titulo

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Artículos' breadCrumbActive={titulo} />
            <ItemForm />
        </>
    )
}
