import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'

import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm/index.js'
import { save } from '../../utility/helpers/Axios/save'
import { PurchaseForm } from './purchaseForm/PurchaseForm'
import { exceptionController } from '../../utility/helpers/undefinedExceptionController'
import { VerifyForm } from './purchaseForm/VerifyForm'

const structureForm = {
    items: []
}

export const PurchaseVerificationFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Purchases', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const title = (id) ? 'Verificar Compra' : 'Verificar Compra'
    const customerName = form.purchasecod ? form.comercialName : title

    const handleSubmit = async (e) => {
        e.preventDefault()

        const prettyForm = {
            ...form,
            idVendor: exceptionController(form.idVendor),
            idStatus: exceptionController(form.idStatus),
            items: form.items.map(item => ({ idItem: exceptionController(item.idItem), quantity: item.quantity }))
        }

        save('Purchases', id, prettyForm)
        history.push('/purchases')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Compras' breadCrumbActive={title} />
                <VerifyForm />
                <ActionButtons />
            </form>
        </>
    )
}
