import { useDispatch, useSelector } from 'react-redux'
import { GetSetNextId, handleChangeController } from '../../../redux/actions/normalForm'
import React, { useEffect } from 'react'
import ReactSelect from 'react-select'
import { ItemsRepeater } from './ItemsRepeater'
import { ExtraItemsRepeater } from './ExtraItemsRepeater'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'

import { OrderCanvas } from './OrderCanvas'

import { startAddSelectOptions } from '../../../redux/actions/selects'
import { createItemRepeatersByPool, handleAddCost, handleCalculateTotalCost } from '../../../redux/actions/orders'
import { deconstructSelect } from '../../../utility/helpers/deconstructSelect'
import { handleCleanCanvas } from '../../../redux/actions/canvas'
import { conditionallyUpdateScrollbar } from 'reactstrap/lib/utils'



export const ProductionForm = () => {
    const dispatch = useDispatch()

    const { normalForm, selectReducer } = useSelector(state => state)
    const { poolsOpt, taxesOpt } = selectReducer


    const comercialName = normalForm['orderData'] ? normalForm['orderData']['idCustomer'].comercialName : ''
    const idOrder = normalForm['orderData'] ? normalForm['orderData'].id : ''
    const deliveryAddress = normalForm['orderData'] ? normalForm['orderData']['customerData'][0].deliveryAddress : ''
    const phone = normalForm['orderData'] ? normalForm['orderData']['customerData'][0].phone : ''
    const email = normalForm['orderData'] ? normalForm['orderData']['customerData'][0].email : ''
    const pool = normalForm['orderData'] ? normalForm['orderData']['idPool'].name : ''
    const tax = normalForm['orderData'] ? normalForm['orderData']['idTax'].name : ''
    const price = normalForm['orderData'] ? normalForm['orderData'].price : ''
    const orderDate = normalForm['orderData'] ? normalForm['orderData'].orderDate : ''
    const deliveryDate = normalForm['orderData'] ? normalForm['orderData'].deliveryDate : ''
    const deliverySchedulerStart = normalForm['orderData'] ? normalForm['orderData'].deliverySchedulerStart : ''
    const deliverySchedulerEnd = normalForm['orderData'] ? normalForm['orderData'].deliverySchedulerEnd : ''
    const observations = normalForm['orderData'] ? normalForm['orderData'].observations : ''

    useEffect(() => {
        dispatch(startAddSelectOptions('Pools', 'poolsOpt', 'fabricationName'))
        dispatch(startAddSelectOptions('Taxes', 'taxesOpt'))
    }, [])



    return (
        <>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                    <label className="control-label">Nº Pedido</label>
                        <h6> {idOrder} </h6>
                    </div>
                    <div className="col-md-2">
                    <label className="control-label">Cliente</label>
                        <h6> {comercialName} </h6>
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Dirección</label>
                        <h6> {deliveryAddress} </h6>
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Teléfono</label>
                        <h6> {phone} </h6>
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Correo Electrónico</label>
                        <h6> {email} </h6>
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Piscina</label>
                        <h6> {pool} </h6>
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">IVA</label>
                        <h6> {tax} </h6>
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Precio</label>
                        <h6> {price} </h6>
                    </div>

                    <div className="col-md-2">
                        <label className="control-label">Fecha de Pedido</label>
                        <h6> {orderDate} </h6>
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Fecha de Entrega</label>
                        <h6> {deliveryDate} </h6>
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Inicio de Horario de entrega</label>
                        <h6> {deliverySchedulerStart} </h6>
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Fin de Horario de entrega</label>
                        <h6> {deliverySchedulerEnd} </h6>
                    </div>
                    <div className="col-md-10">
                        <label className="control-label">Observaciones</label>
                        <h6> {observations} </h6>
                    </div>
                    <div className="col-md-4">
                        <Select name="state" placeholder="Estado" label="Estado" endpoint="ProductionStatus" labelName="name" />
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className=" card-body row px-3">
                            <ItemsRepeater />
                        </div>
                    </div>

                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className=" card-body row px-3">
                            <ExtraItemsRepeater />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <OrderCanvas />
                </div>
            </div>
        </>
    )
}
