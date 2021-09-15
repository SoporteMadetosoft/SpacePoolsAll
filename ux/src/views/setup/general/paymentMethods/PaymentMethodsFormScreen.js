import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { handleStartEditing } from '../../../../redux/actions/normalForm'

import BreadCrumbs from '@components/breadcrumbs'
import { PaymentMethodsForm } from './paymentMethodsForm/PaymentMethodsForm'

export const PaymentMethodsFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('PaymentMethods', id))
        }
    }, [])

    const title = (id) ? 'Editar método de pago' : 'Añadir método de pago'
    const customName = form.name ? form.name : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Métodos de pago' breadCrumbActive={title} />
            <PaymentMethodsForm />
        </>
    )
}
