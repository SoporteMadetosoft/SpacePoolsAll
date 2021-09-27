import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'

import { handleChangeController, handleStartEditing, initNormalForm } from '../../redux/actions/normalForm/index.js'
import { save } from '../../utility/helpers/Axios/save'
import { OrderForm } from './orderForm/OrderForm'
import { handleCleanUp } from '../../redux/actions/fileUpload'
import { exceptionController } from '../../utility/helpers/undefinedExceptionController'


import { fromFile } from 'file-type'
import { getCItemsByOrderId, handleCleanCanvas, setInitialCanvas, setNewCanvasPosition } from '../../redux/actions/canvas'
import { catchAndSetPrice } from '../../redux/actions/orders'


const structureForm = {
    baseItems: [],
    extraItems: []

}

export const OrderFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)
    const canvas = useSelector(state => state.canvasReducer)
    const orders = useSelector(state => state.ordersReducer)
    const canvasItems = useSelector(state => state.normalForm.canvasItems)


    useEffect(() => {

        if (id) {
            dispatch(handleStartEditing('Orders', id))
           
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    useEffect(() => {
        if (id) {
           // dispatch(setNewCanvasPosition())
           dispatch(getCItemsByOrderId('Orders', id))
        } else {
            dispatch(setInitialCanvas())
        }
        dispatch(catchAndSetPrice())
    }, [form])


   // useEffect(() => {
   //    
   // }, [])



    const title = (id) ? 'Editar Pedido' : 'Añadir Pedido'
    const customerName = form.ordercod ? form.idOrder : title

    const handleSubmit = async (e) => {
        e.preventDefault()

        let idCustomer = undefined
        if (form.customerData !== undefined) {
            idCustomer = form.customerData[0].id
        }
        const customerDataObj = {
            id: idCustomer,
            deliveryAddress: form.deliveryAddress,
            phone: form.phone,
            email: form.email
        }
        const productionObj = {
            isStarted: 0
        }

        delete form.deliveryAddress
        delete form.phone
        delete form.email
        delete form.status
        delete form.canvasItems

        //const insert = await orderDao.insert(customer)

        const prettyForm = {
            ...form,
            idTax: form.idTax.id,
            idPool: form.idPool.id,
            price: orders.price,
            idCustomer: form.idCustomer.id,
            canvas: canvas.elements,
            customerData: customerDataObj,
            production: productionObj,
            baseItems: form.baseItems.map(bI => ({ idItem: bI.idItem, quantity: bI.quantity })),
            extraItems: form.extraItems.map(eI => ({ idItem: eI.idItem.id, quantity: eI.quantity })),
            canvas: canvas.elements.map(el => ({ id: el.id, idElemento: el.idElemento, name: el.name, x: el.x, y: el.y, imageUrl: el.imageUrl }))
            //            customerDao.multipleAccess(documents, carrierDocumentsDao, insert.insertId, 'idCustomer')
        }
        //console.log(prettyForm)
        save('Orders', id, prettyForm)
        // dispatch(handleCleanUp())
        // history.push('/orders')

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
