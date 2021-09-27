import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BreadCrumbs from '@components/breadcrumbs'

import { GetSetNextId, handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'
import { VendorsForm } from './vendorsForm/VendorsForm'

const structureForm = {
    addresses: [],
    contacts: []
}

export const VendorsFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Vendors', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const title = (id) ? 'Editar Proveedores' : 'Añadir Proveedores'
    const vendorName = form.comercialName ? form.comercialName : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={vendorName} breadCrumbParent='Proveedores' breadCrumbActive={title} />
            <VendorsForm />
        </>
    )
}