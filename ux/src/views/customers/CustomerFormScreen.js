import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'

import { initNormalForm } from '../../redux/actions/normalForm/index.js'
import { CustomersForm } from './customerForm/CustomersForm'


const structureForm = {
    addresses: [],
    contacts: []
}

export const CustomerFormScreen = () => {

    const { id } = useParams()
    
    const title = (id) ? 'Editar Cliente' : 'Añadir Cliente'
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch( initNormalForm(structureForm) )
    }, [initNormalForm])
    
    const { normalForm } = useSelector(state => state)

    const customerName = normalForm.comercialName ? normalForm.comercialName : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={ customerName } breadCrumbParent='Clientes' breadCrumbActive={title} />
            <CustomersForm />  
            <ActionButtons />
        </>
    )
}
