import React from 'react'
import { useSelector } from 'react-redux'

import { ExtraItemsRepeater } from '../../productions/productionForm/ExtraItemsRepeater'
import { ItemsRepeater } from '../../productions/productionForm/ItemsRepeater'
import { ProductionCanvas } from '../../productions/productionForm/ProductionCanvas'

export const ViewDeliveryForm = () => {

    const { normalForm } = useSelector(state => state)

    const cn = normalForm['idCustomer'] !== undefined ? normalForm['idCustomer'].comercialName : ''
    const deliveryAddress = normalForm['customerData'] !== undefined ? normalForm['customerData'][0].deliveryAddress : ''
    const phone = normalForm['customerData'] !== undefined ? normalForm['customerData'][0].phone : ''
    const email = normalForm['customerData'] !== undefined ? normalForm['customerData'][0].email : ''
    const pool = normalForm['idPool'] !== undefined ? normalForm['idPool'].name : ''
    const tax = normalForm['idTax'] !== undefined ? normalForm['idTax'].name : ''

    const idOrder = normalForm ? normalForm.idOrder : ''
    const price = normalForm ? normalForm.price : ''
    const orderDate = normalForm ? normalForm.orderDate : ''
    const deliveryDate = normalForm ? normalForm.deliveryDate : ''
    const deliverySchedulerStart = normalForm ? normalForm.deliverySchedulerStart : ''
    const deliverySchedulerEnd = normalForm ? normalForm.deliverySchedulerEnd : ''
    const observations = normalForm ? normalForm.observations : ''

    return (
        <>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <label className="control-label">Nº Pedido</label>
                        <h6> {idOrder} </h6>
                    </div>
                    <div className="col-md-4">
                        <label className="control-label">Cliente</label>
                        <h6> {cn} </h6>
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Dirección</label>
                        <h6> {deliveryAddress} </h6>
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Teléfono</label>
                        <h6> {phone} </h6>
                    </div>
                    <div className="col-md-2">
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
                    <div className="col-md-12">
                        <label className="control-label">Observaciones</label>
                        <h6> {observations} </h6>
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
                    {/* <ProductionCanvas /> */}
                </div>
            </div>
        </>
    )
}
