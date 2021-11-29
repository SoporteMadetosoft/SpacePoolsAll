import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { handleStartEditing, initNormalForm } from '../../../redux/actions/normalForm'
import { ItemsColorForm } from './itemColorsForm/ItemsColorsForm'

const structureForm = {
    color: []
}

export const ItemsColorsFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('ItemColors', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const titulo = (id) ? 'Editar Artícul con color' : 'Añadir Artícul con color'
    const customerName = (form.name) ? form.name : titulo


    return (
        <>
            <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Artículos con color' breadCrumbActive={titulo} />
            <ItemsColorForm />
        </>
    )
}