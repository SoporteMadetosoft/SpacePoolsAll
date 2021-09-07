import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'

import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'
import { VendorsForm } from './vendorsForm/VendorsForm'
import { exceptionController } from '../../utility/helpers/undefinedExceptionController'
import { save } from '../../utility/helpers/Axios/save'

const structureForm = {
    addresses: [],
    contacts: []
}

export const VendorsFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        const prettyForm = {
            ...form,
            idPaymentMethod: exceptionController(form.idPaymentMethod),
            idVendorType: exceptionController(form.idVendorType),
            idStatus: exceptionController(form.idStatus),
            addresses: form.addresses.map(address => ({ ...address, addressType: exceptionController(address.addressType) })),
            contacts: form.contacts.map(contact => ({ ...contact, department: exceptionController(contact.department) }))
        }
        save('Vendors', id, prettyForm)
        history.push('/vendors')
    }

    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={vendorName} breadCrumbParent='Proveedores' breadCrumbActive={title} />
            <VendorsForm />
            <ActionButtons />
        </form>
    )
}