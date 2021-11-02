import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'

import { handleChangeController, handleStartEditing, initNormalForm } from '../../redux/actions/normalForm/index.js'
import { save } from '../../utility/helpers/Axios/save'
import { ProductionForm } from './productionForm/ProductionForm'
import { handleCleanUp } from '../../redux/actions/fileUpload'
import { exceptionController } from '../../utility/helpers/undefinedExceptionController'


import { fromFile } from 'file-type'
import { getCItemsByOrderId, handleCleanCanvas, setInitialCanvas, setNewCanvasPosition } from '../../redux/actions/canvas'
import { catchAndSetPrice } from '../../redux/actions/orders'


const structureForm = {
    baseItems: [],
    extraItems: []

}

export const ProductionFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)
    const canvas = useSelector(state => state.canvasReducer)
    const orders = useSelector(state => state.ordersReducer)
    const canvasItems = useSelector(state => state.normalForm.canvasItems)

    const idOrder = form['orderData'] ? form['orderData'].id : ''

    useEffect(() => {

        if (id) {
            dispatch(handleStartEditing('Productions', id))
        } else {
            dispatch(catchAndSetPrice(0))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    useEffect(() => {
        if (idOrder) {
            dispatch(getCItemsByOrderId('Orders', idOrder))
        } else {
            dispatch(setInitialCanvas())
        }
        dispatch(catchAndSetPrice())
    }, [form])


    const title = (id) ? 'Ver Producción' : ''
    const customerName = form.ordercod ? form.idOrder : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Pedidos' breadCrumbActive={title} />
            <ProductionForm />
            <ActionButtons form={false} />
        </>

    )
}
