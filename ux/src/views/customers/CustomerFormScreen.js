import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'
import { DynamicForm } from '@cc/form/DynamicForm'
import { RepeaterForm } from '@cc/form/RepeaterForm'
import { customerForm } from '@fixed/customers/formComposition/customerForm'
import { addressesForm } from '@fixed/customers/formComposition/adressesForm'
import { contacts } from '@fixed/customers/formComposition/contacts'

import { handleStartEditing } from '../../redux/actions/form'
import { ActionButtons } from '../../components/actionButtons/ActionButtons'
import { save } from '../../utility/helpers/Axios/save'

export const CustomerFormScreen = () => {

    const { id } = useParams()
    
    const titulo = (id) ? 'Editar Cliente' : 'Añadir Cliente'

    const dispatch = useDispatch()
    const history = useHistory()
    const {base} = useSelector(state => state.form.formData)
    const form = useSelector(state => state.form)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Customers', id))
        }
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        save('Customers', id, form)
        history.push('/customers')
    }

    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={ titulo }  breadCrumbParent='Clientes' breadCrumbActive={ titulo }  />
            <DynamicForm formCustom={ customerForm } data={ base } />
            <RepeaterForm { ...addressesForm } />
            <RepeaterForm { ...contacts } />
            <ActionButtons />
        </form>
    )
}
