import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { handleStartEditing, initNormalForm } from '../../../redux/actions/normalForm'
import { ColorRepeater, ItemsColorForm } from './itemColorsForm/ItemsColorsForm'

const structureForm = {}

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

    const titulo = (id) ? 'Editar Artículo Colores' : 'Añadir Artículo Colores'
    const customerName = (form.name) ? form.name : titulo


    return (
        <>
            <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Artículo Colores' breadCrumbActive={titulo} />
            <ItemsColorForm />
        </>
    )
}