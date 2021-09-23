import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'

import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm/index.js'
import { save } from '../../utility/helpers/Axios/save'
import { OrderForm } from './orderForm/OrderForm'
import { handleCleanUp } from '../../redux/actions/fileUpload'
import { exceptionController } from '../../utility/helpers/undefinedExceptionController'

const structureForm = {
    items: [],
    extraItems: []
}

export const OrderFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)
    const canvas = useSelector(state => state.canvasReducer)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Orders', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const title = (id) ? 'Editar Pedido' : 'Añadir Pedido'
    const customerName = form.ordercod ? form.orderId : title

    const handleSubmit = async (e) => {
        e.preventDefault()


        const prettyForm = {
            ...form,
            items: form.items.map(item => ({ ...item, name: exceptionController(item.name.value) })),
            canvas: canvas.elements.map(el => ({ idElement: el.id, name: el.name, x: el.x, y: el.y }))
        }


        save('Orders', id, prettyForm)
        dispatch(handleCleanUp())
        history.push('/orders')

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Pedidos' breadCrumbActive={title} />
                <OrderForm />
                <ActionButtons />
            </form>
        </>

    )
}
