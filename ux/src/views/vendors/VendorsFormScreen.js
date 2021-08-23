import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import { ActionButtons } from '../../components/actionButtons/ActionButtons'

import { save } from '../../utility/helpers/Axios/save'
import { VendorsForm } from './vendorsForm/VendorsForm'
import { initNormalForm } from '../../redux/actions/normalForm'
import { exceptionController } from '../../utility/helpers/undefinedExceptionController'


const structureForm = {
    addresses: [],
    contacts: []
}

export const VendorsFormScreen = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const prettyForm = {
            ...form,
            idPaymentMethod:exceptionController( form.idPaymentMethod),
            idVendorType: exceptionController( form.idVendorType),
            idStatus: exceptionController(form.idStatus) 
        }
        save('Vendors', id, prettyForm)
    }

    const title = (id) ? 'Editar Proveedores' : 'Añadir Proveedores'
    const vendorName = form.name ? form.name : title

    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={vendorName} breadCrumbParent='proveedores' breadCrumbActive={title} />
            <VendorsForm id={id} />
            <ActionButtons />
        </form>
    )
}