import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'
import { ItemsFamilyForm } from './itemsFamilyForm/ItemsFamilyForm'

const structureForm = {}

export const ItemsFamilyFormScreen = () => {

    const { id } = useParams()
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


    return (
        <>
            <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Familias' breadCrumbActive={titulo} />
            <ItemsFamilyForm />
        </>
    )
}
