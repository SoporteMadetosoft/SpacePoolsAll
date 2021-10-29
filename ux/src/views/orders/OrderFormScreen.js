import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'

import { GetSetNextId, handleChangeController, handleGetForm, handleStartEditing, initNormalForm } from '../../redux/actions/normalForm/index.js'
import { save } from '../../utility/helpers/Axios/save'
import { OrderForm } from './orderForm/OrderForm'
import { handleCleanUp } from '../../redux/actions/fileUpload'
import { exceptionController, inputExceptionController } from '../../utility/helpers/undefinedExceptionController'


import { fromFile } from 'file-type'
import { getCItemsByOrderId, handleCleanCanvas, setInitialCanvas, setNewCanvasPosition } from '../../redux/actions/canvas'
import { catchAndSetPrice } from '../../redux/actions/orders'
import { validate, validator } from '../../utility/formValidator/ValidationTypes'
import { setErrors, setSchema } from '../../redux/actions/formValidator'


const structureForm = {
    baseItems: [],
    extraRaws: [],
    extraItems: []

}
const formSchema = {
    //piscina, cliente, fecha de entrega, fecha de pedido y fecha de produccion
    idCustomer: { validations: [validator.isRequired] },
    idPool: { validations: [validator.isRequired] },
    orderDate: { validations: [validator.isRequired] },
    productionDate: { validations: [validator.isRequired] },
    deliveryDate: { validations: [validator.isRequired] }

}

export const OrderFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const { formValidator, normalForm } = useSelector(state => state)
    const form = useSelector(state => state.normalForm)
    const canvas = useSelector(state => state.canvasReducer)
    const orders = useSelector(state => state.ordersReducer)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Orders', id))
// <<<<<<< Updated upstream
//             dispatch(getCItemsByOrderId('Orders', id))
// =======

// >>>>>>> Stashed changes
        } else {
            dispatch(catchAndSetPrice(0))
            dispatch(setInitialCanvas())
        }
        dispatch(initNormalForm(structureForm))

    }, [initNormalForm])

    useEffect(() => {

        dispatch(catchAndSetPrice())
    }, [form])

    useEffect(() => {
        if (normalForm.id === undefined) {
            dispatch(GetSetNextId("Orders", 'orderCode'))

        } else orderCode = normalForm.id
        dispatch(setSchema(formSchema))


    })


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
        const prettyForm = {
            ...form,
            idTax: form.idTax !== undefined ? form.idTax.id : 1,
            idPool: exceptionController(form.idPool),
            idCustomer: exceptionController(form.idCustomer),
            price: inputExceptionController(orders.price),
            canvas: canvas.elements,
            customerData: inputExceptionController(customerDataObj),
            production: inputExceptionController(productionObj),
            baseItems: form.baseItems.map(bI => ({ idItem: bI.idItem, quantity: bI.quantity, idColor: exceptionController(bI.idColor) })),
            extraItems: form.extraItems.map(eI => ({ idItem: eI.idItem.id, quantity: eI.quantity, idColor: exceptionController(eI.idColor) })),
            extraRaws: form.extraRaws.map(eR => ({ idItem: eR.idItem.id, quantity: eR.quantity, idColor: exceptionController(eR.idColor) })),
            canvas: canvas.elements.map(el => ({ id: el.id, idElemento: el.idElemento, name: el.name, x: el.x, y: el.y, rotation: el.rotation }))
        }

        const errors = validate(formValidator.schema, normalForm)
        console.log(errors)


        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))

        } else {
            const form2 = dispatch(handleGetForm())
            form2.then(async (value) => {
                const prettyForm = {
                    ...value,
                    idTax: form.idTax !== undefined ? form.idTax.id : 1,
                    idPool: exceptionController(value.idPool),
                    idCustomer: exceptionController(value.idCustomer),
                    price: inputExceptionController(value.price),
                    orderDate: exceptionController(value.orderDate),
                    productionDate: exceptionController(value.productionDate),
                    deliveryDate: exceptionController(value.deliveryDate),
                    canvas: canvas.elements,
                    customerData: inputExceptionController(customerDataObj),
                    production: inputExceptionController(productionObj),
                    baseItems: form.baseItems.map(bI => ({ idItem: bI.idItem, quantity: bI.quantity, idColor: exceptionController(bI.idColor) })),
                    extraItems: form.extraItems.map(eI => ({ idItem: eI.idItem.id, quantity: eI.quantity, idColor: exceptionController(eI.idColor) })),
                    canvas: canvas.elements.map(el => ({ id: el.id, idElemento: el.idElemento, name: el.name, x: el.x, y: el.y, rotation: el.rotation }))
                }

                save('Orders', id, prettyForm)
                dispatch(handleCleanUp())
                history.push('/orders')

            })
        }

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
