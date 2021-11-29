import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { handleStartEditing } from '../../../../redux/actions/normalForm'

import BreadCrumbs from '@components/breadcrumbs'
import { PlaceForm } from './placeForm/PlaceForm'

export const PlaceFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Place', id))
        }
    }, [])

    const title = (id) ? 'Editar Ubicación' : 'Añadir Ubicación'
    const customName = form.name ? form.name : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Ubicaciones' breadCrumbActive={title} />
            <PlaceForm />
        </>
    )
}
