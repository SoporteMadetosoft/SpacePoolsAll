import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'

import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm/index.js'
import { save } from '../../utility/helpers/Axios/save'
import { OrderForm } from './orderForm/OrderForm'

const structureForm = {
    items: [],
    extraItems: []
}

export const OrderFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)

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

        let itemsPretty = ''

        form.items.forEach(e => {
            itemsPretty = [
                {
                    ...e,
                    name: e.name.value
                }
            ]
        })

   
       
        const prettyForm = {
            ...form,
            items: [...itemsPretty]
        }
        console.log(prettyForm)
        save('Orders', id, prettyForm)
        history.push('/orders')
 
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Compras' breadCrumbActive={title} />
                <OrderForm />
                <ActionButtons />
            </form>
        </>
       
    )
}
