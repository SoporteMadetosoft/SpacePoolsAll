import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CustomerTypeForm } from './customerTypeForm/CustomerTypeForm'

export const CustomerTypeFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('CustomerType', id))
        }
    }, [])

    const title = (id) ? 'Editar Tipo de cliente' : 'Añadir Tipo de cliente'
    const customName = form.name ? form.name : title



    return (
        <>
            <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Tipos de cliente' breadCrumbActive={title} />
            <CustomerTypeForm />
        </>
    )
}
