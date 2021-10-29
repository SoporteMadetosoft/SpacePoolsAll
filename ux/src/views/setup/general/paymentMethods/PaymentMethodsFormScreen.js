import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { GetSetNextId, handleStartEditing } from '../../../../redux/actions/normalForm'

import BreadCrumbs from '@components/breadcrumbs'
import { PaymentMethodsForm } from './paymentMethodsForm/PaymentMethodsForm'
import { validate, validator } from '../../../../utility/formValidator/ValidationTypes'
import { setErrors, setSchema } from '../../../../redux/actions/formValidator'

const formSchema = {
    name: { validations: [validator.isRequired] },
    value: { validations: [validator.isRequired] }

}

export const PaymentMethodsFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const { normalForm, formValidator} = useSelector( state => state)

    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('PaymentMethods', id))
        }
    }, [])
    

    const title = (id) ? 'Editar Método de pago' : 'Añadir Método de pago'
    const customName = form.name ? form.name : title

    

    return (
        <>
                <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Métodos de pago' breadCrumbActive={title} />
                <PaymentMethodsForm />
        </>
    )
}
