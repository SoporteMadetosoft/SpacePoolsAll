import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { customerTypeForm } from '@fixed/setup/customers/customerType/formComposition/customerTypeForm'
import { DynamicForm } from '@cc/form/DynamicForm'
import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleStartEditing } from '../../../../redux/actions/form'
import { save } from '../../../../utility/helpers/Axios/save'
import { startLoadingCustomerType } from './redux/actions'

export const CustomerTypeFormScreen = () => {
             
    const { id } = useParams()

    const titulo = (id) ? 'Editar Tipo de cliente' : 'Añadir Tipo de cliente'
   
    const dispatch = useDispatch()
    const history = useHistory()
    const {base} = useSelector(state => state.form.formData)
    const form = useSelector(state => state.form)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('CustomerType', id))
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        save('CustomerType', id, form)
        dispatch(startLoadingCustomerType())
        history.push('/setup/customer/customerType')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Tipos de cliente' breadCrumbActive={titulo} />
            <DynamicForm formCustom={ customerTypeForm } data={base} />
            <ActionButtons />
        </form>
    )
}
