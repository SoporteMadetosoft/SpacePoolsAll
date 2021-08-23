import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import { ActionButtons } from '../../components/actionButtons/ActionButtons'

import { save } from '../../utility/helpers/Axios/save'
import { VendorsForm } from './vendorsForm/VendorsForm'
import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'
import { exceptionController } from '../../utility/helpers/undefinedExceptionController'


const structureForm = {
    addresses: [],
    contacts: []
}

export const VendorsFormScreen = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    
    useEffect(() => {
        dispatch( initNormalForm(structureForm) )
    }, [])
    
    const form = useSelector(state => state.normalForm)
    
    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Vendors', id))
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        let addressesPretty = ''

        form.addresses.forEach(e => {
            addressesPretty = [
                {
                    ...e,
                    addressType: e.addressType.value
                }
            ]
        })

        let contactPretty = ''

        form.contacts.forEach(e => {
            contactPretty = [
                {
                    ...e,
                    department: e.department.value
                }
            ]
        })

        const prettyForm = {
            ...form,
            idPaymentMethod:exceptionController( form.idPaymentMethod),
            idVendorType: exceptionController( form.idVendorType),
            idStatus: exceptionController(form.idStatus),
            addresses: [...addressesPretty],
            contacts: [...contactPretty]
        }
        save('Vendors', id, prettyForm)
        history.push('/vendors')
    }

    const title = (id) ? 'Editar Proveedores' : 'Añadir Proveedores'
    const vendorName = form.comercialName ? form.comercialName : title

    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={vendorName} breadCrumbParent='Proveedores' breadCrumbActive={title} />
            <VendorsForm id={id} />
            <ActionButtons />
        </form>
    )
}