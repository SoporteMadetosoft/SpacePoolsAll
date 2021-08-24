import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BreadCrumbs from '@components/breadcrumbs'
import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { startAddSelectOptions } from '../../../../redux/actions/selects'
import { PaymentMethodsForm } from './paymentMethodsForm/PaymentMethodsForm'
import { save } from '../../../../utility/helpers/Axios/save'

export const PaymentMethodsFormScreen = () => {
 
    const { id } = useParams()

    const titulo = (id) ? 'Editar método de pago' : 'Añadir método de pago'
   
    const dispatch = useDispatch()
    const history = useHistory()
    const form = useSelector(state => state.normalForm)

    const handleSubmit = async (e) => {
        e.preventDefault()
        save('PaymentMethods', id, form)
        dispatch(startAddSelectOptions('/setup/general/paymentMethod', 'paymentMethodOpt'))
        history.push('/setup/general/paymentMethods')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Métodos de pago' breadCrumbActive={titulo} />
            <PaymentMethodsForm />
            <ActionButtons />
        </form>
    )
}
