import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { handleStartEditing } from '../../../../redux/actions/normalForm'

import BreadCrumbs from '@components/breadcrumbs'
import { ColorsForm } from './colorsForm/ColorsForm'

export const ColorsFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Colors', id))
        }
    }, [])

    const title = (id) ? 'Editar Color' : 'Añadir Color'
    const customName = form.name ? form.name : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Colores' breadCrumbActive={title} />
            <ColorsForm />
        </>
    )
}
