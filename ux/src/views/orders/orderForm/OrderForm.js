import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeController } from '../../../redux/actions/normalForm'


import { ItemsRepeater } from './ItemsRepeater'

import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'
import { OrderCanvas } from './OrderCanvas'

export const OrderForm = () => {

    const dispatch = useDispatch()

    const { normalForm, selectReducer } = useSelector(state => state)

    const { observations } = normalForm

    const {
        idVendor
    } = selectReducer

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    return (
        <>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <Input name="orderCode" placeholder="Nº Pedido" label="Nº Pedido" />
                    </div>
                    <div className="col-md-4">
                        <Select name="customerId" placeholder="Cliente" label="Cliente" endpoint="Customers" labelName="comercialName" />
                    </div>
                    <div className="col-md-2">
                        <Input name="purchaseDate" placeholder="Dirección de entrega" label="Dirección" />
                    </div>
                    <div className="col-md-2">
                        <Input name="phone" placeholder="Teléfono" label="Teléfono" />
                    </div>
                    <div className="col-md-2">
                        <Input name="email" placeholder="Correo Electrónico" label="Correo Electrónico" />
                    </div>
                    <div className="col-md-2">
                        <Select name="pool" placeholder="Piscina" label="Piscina" endpoint="Pools" labelName="fabricationName" />
                    </div>
                    <div className="col-md-2">
                        <Input name="orderDate" type="date" placeholder="Fecha de Pedido" label="Fecha de Pedido" />
                    </div>
                    <div className="col-md-2">
                        <Input name="deliveryDate" type="date" placeholder="Fecha de Entrega" label="Fecha de Entrega" />
                    </div>
                    <div className="col-md-2">
                        <Input name="deliverySchedulerStart" type="time" placeholder="" label="Inicio de Horario de entrega" />
                    </div>
                    <div className="col-md-2">
                        <Input name="deliverySchedulerEnd" type="time" placeholder="" label="Fin de Horario de entrega" />
                    </div>
                    <div className="col-md-12">
                        <label className="control-label">Observaciones</label>
                        <textarea
                            className="form-control"
                            name="observations"
                            value={observations}
                            onChange={handleInputChange}
                        />
                    </div>


                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <ItemsRepeater />
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
