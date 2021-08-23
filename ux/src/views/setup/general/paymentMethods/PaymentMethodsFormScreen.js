import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BreadCrumbs from '@components/breadcrumbs'
import { DynamicForm } from '@cc/form/DynamicForm'
import { paymentMethodForm } from '@fixed/setup/general/paymentMethods/formComposition/paymentMethodForm'
import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { handleStartEditing } from '../../../../redux/actions/form'
import { startLoadingsPaymentMethods } from './redux/actions'

export const PaymentMethodsFormScreen = () => {
 
    const { id } = useParams()

    const titulo = (id) ? 'Editar método de pago' : 'Añadir método de pago'
   
    const dispatch = useDispatch()
    const history = useHistory()
    const {base} = useSelector(state => state.form.formData)
    const form = useSelector(state => state.form)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('PaymentMethods', id))
        }
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        save('PaymentMethods', id, form)
        dispatch(startLoadingsPaymentMethods())
        history.push('/setup/general/paymentMethods')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Métodos de pago' breadCrumbActive={titulo} />
            <DynamicForm formCustom={ paymentMethodForm } data={base} />
            <ActionButtons />
        </form>
    )
}
