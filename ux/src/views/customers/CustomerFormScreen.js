import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'
import { AbilityContext } from '@src/utility/context/Can'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'

import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm/index.js'
import { CustomersForm } from './customerForm/CustomersForm'
import { save } from '../../utility/helpers/Axios/save'
import { exceptionController } from '../../utility/helpers/undefinedExceptionController'

const structureForm = {
    addresses: [],
    contacts: []
}

export const CustomerFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)

    const ability = useContext(AbilityContext)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Customers', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const title = (id) ? 'Editar Cliente' : 'Añadir Cliente'
    const customerName = form.comercialName ? form.comercialName : title

    const handleSubmit = async (e) => {
        e.preventDefault()

        const prettyForm = {
            ...form,
            idPaymentMethod: exceptionController(form.idPaymentMethod),
            idPayDay: exceptionController(form.idPayDay),
            idCustomerOrigin: exceptionController(form.idCustomerOrigin),
            idCustomerType: exceptionController(form.idCustomerType),
            idCustomerActivity: exceptionController(form.idCustomerActivity),
            idCustomerCategory: exceptionController(form.idCustomerCategory),
            idMode: exceptionController(form.idMode),
            idStatus: exceptionController(form.idStatus),
            idLanguage: exceptionController(form.idLanguage),
            addresses: form.addresses.map(address => ({ ...address, addressType: exceptionController(address.addressType) })),
            contacts: form.contacts.map(contact => ({ ...contact, department: exceptionController(contact.department) }))
        }
        save('Customers', id, prettyForm)
        history.push('/customers')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Clientes' breadCrumbActive={title} />
                <CustomersForm />
                <ActionButtons />
            </form>
        </>
    )
}
