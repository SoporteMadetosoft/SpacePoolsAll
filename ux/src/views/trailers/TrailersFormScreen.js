import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'
import { TrailersForm } from './trailersForm/TrailersForm'

const structureForm = {
    documents: []
}

export const TrailersFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Trailers', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const title = (id) ? 'Editar Remolque' : 'Añadir Remolque'
    const customerName = (form.plate) ? form.plate : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Remolques' breadCrumbActive={title} />
            <TrailersForm />
        </>
    )
}
