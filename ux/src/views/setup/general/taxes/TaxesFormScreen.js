import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import BreadCrumbs from '@components/breadcrumbs'
import { TaxesForm } from './taxesForm/TaxesForm'
import { handleStartEditing } from '../../../../redux/actions/normalForm'

export const TaxesFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Taxes', id))
        }
    }, [])

    const title = (id) ? 'Editar Impuesto' : 'Añadir Impuesto'
    const customName = form.name ? form.name : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Impuestos' breadCrumbActive={title} />
            <TaxesForm />
        </>
    )
}