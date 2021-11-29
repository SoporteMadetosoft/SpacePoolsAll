import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { handleStartEditing } from '../../../../redux/actions/normalForm'

import BreadCrumbs from '@components/breadcrumbs'
import { VendorTypeForm } from './vendorTypeForm/VendorTypeForm'

export const VendorTypeFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('VendorType', id))
        }
    }, [])

    const title = (id) ? 'Editar Tipo de vendedor' : 'Añadir Tipo de vendedor'
    const customName = form.name ? form.name : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Tipos de proveedor' breadCrumbActive={title} />
            <VendorTypeForm />
        </>
    )
}
