import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import BreadCrumbs from '@components/breadcrumbs'
import { CustomersForm } from './customerForm/CustomersForm'

import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm/index.js'

const structureForm = {
    addresses: [],
    contacts: [],
    documents: []
}

export const CustomerFormScreen = () => {

    const { id } = useParams()

    const dispatch = useDispatch()

    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Customers', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const title = (id) ? 'Editar Cliente' : 'Añadir Cliente'
    const customerName = form.comercialName ? form.comercialName : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Clientes' breadCrumbActive={title} />
            <CustomersForm />
        </>
    )
}