import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'

import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm/index.js'
import { exceptionController } from '../../utility/helpers/undefinedExceptionController'
import { VerifyForm } from './purchaseForm/VerifyForm'
import { verify } from '../../utility/helpers/Axios/Verify'

const structureForm = {
    items: []
}

export const PurchaseVerificationFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        // dispatch(startAddSelectStatus('Vendors','Vendors','comercialName'))
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
            items: form.items.map(item => {
                const cantRecived = item.recived2 ? item.recived2 : 0

                return {
                    id: item.id,
                    idItem: exceptionController(item.idItem),
                    quantity: item.quantity - cantRecived,
                    recived: cantRecived
                }
            }),
            itemColors: form.itemColors.map(item => {
                const cantRecived = item.recived2 ? item.recived2 : 0

                return {
                    id: item.id,
                    idItem: exceptionController(item.idItem),
                    idColor: exceptionController(item.idColor),
                    quantity: item.quantity - cantRecived,
                    recived: cantRecived
                }
            })
        }

        await verify('Purchases', id, prettyForm)
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
