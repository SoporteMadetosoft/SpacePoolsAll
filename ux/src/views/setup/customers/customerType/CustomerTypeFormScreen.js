import React from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { save } from '../../../../utility/helpers/Axios/save'
import { CustomerTypeForm } from './customerTypeForm/CustomerTypeForm'
import { startAddSelectOptions } from '../../../../redux/actions/selects'

export const CustomerTypeFormScreen = () => {
             
    const { id } = useParams()

    const titulo = (id) ? 'Editar Tipo de cliente' : 'Añadir Tipo de cliente'
   
    const dispatch = useDispatch()
    const history = useHistory()

    const form = useSelector(state => state.normalForm)

    const handleSubmit = async (e) => {
        e.preventDefault()
        save('CustomerType', id, form)
        dispatch(startAddSelectOptions('/setup/customers/type', 'customerTypeOpt'))

        history.push('/setup/customer/customerType')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Tipos de cliente' breadCrumbActive={titulo} />
            <CustomerTypeForm />
            <ActionButtons />
        </form>
    )
}
