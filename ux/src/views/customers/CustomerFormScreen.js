import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'

import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm/index.js'
import { CustomersForm } from './customerForm/CustomersForm'
import { save } from '../../utility/helpers/Axios/save'

const structureForm = {
    addresses: [],
    contacts: []
}

export const CustomerFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)

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

        let addressesPretty = ''

        form.addresses.forEach(e => {
            addressesPretty = [
                {
                    ...e,
                    addressType: e.addressType.value
                }
            ]
        })

        let contactPretty = ''

        form.contacts.forEach(e => {
            contactPretty = [
                {
                    ...e,
                    department: e.department.value
                }
            ]
        })

        const prettyForm = {
            ...form,
            idPaymentMethod: form.idPaymentMethod.value,
            idPayDay: form.idPayDay.value,
            idCustomerOrigin: form.idCustomerOrigin.value,
            idCustomerType: form.idCustomerType.value,
            idCustomerActivity: form.idCustomerActivity.value,
            idCustomerCategory: form.idCustomerCategory.value,
            idMode: form.idMode.value,
            idStatus: form.idStatus.value,
            idLanguage: form.idLanguage.value,
            addresses: [...addressesPretty],
            contacts: [...contactPretty]

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
