import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { GetSetNextId, handleStartEditing, initNormalForm } from '../../redux/actions/normalForm/index.js'
import { OrderForm } from './orderForm/OrderForm'

import { getCItemsByOrderId, setInitialCanvas } from '../../redux/actions/canvas'
import { catchAndSetPrice } from '../../redux/actions/orders'


const structureForm = {
    baseItems: [],
    extraRaws: [],
    extraRawColors: [],
    extraItems: [],
    extraItemColors: []

}

export const OrderFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Orders', id))
            dispatch(getCItemsByOrderId('Orders', id))

        } else {
            dispatch(catchAndSetPrice(0))
            dispatch(setInitialCanvas())
        }
        dispatch(initNormalForm(structureForm))

    }, [initNormalForm])

    useEffect(() => {
        dispatch(catchAndSetPrice())
    }, [form])

    const title = (id) ? 'Editar Pedido' : 'Añadir Pedido'
    const customerName = form.ordercod ? form.idOrder : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Pedidos' breadCrumbActive={title} />
            <OrderForm />
        </>

    )
}
