import { useDispatch, useSelector } from 'react-redux'
import { handleChangeController, setIdInXCode } from '../../../redux/actions/normalForm'
import React, { useEffect } from 'react'
import ReactSelect from 'react-select'
import { ItemsRepeater } from './ItemsRepeater'
import { ExtraItemsRepeater } from './ExtraItemsRepeater'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'

import { OrderCanvas } from './OrderCanvas'

import { startAddSelectOptions } from '../../../redux/actions/selects'
import { createItemRepeatersByPool, handleAddCost, handleAugmentIdTemporary, handleCalculateTotalCost, handleCalcuteTotalPrice } from '../../../redux/actions/orders'
import { deconstructSelect } from '../../../utility/helpers/deconstructSelect'



export const OrderForm = () => {

    const { idTemporary } = useSelector(state => state.ordersReducer)
    let { price } = useSelector(state => state.ordersReducer)

    let { orderCode } = useSelector(state => state.normalForm)

    const dispatch = useDispatch()

    const { normalForm, selectReducer } = useSelector(state => state)
    const { poolsOpt, taxesOpt } = selectReducer
    const { observations } = normalForm


    const idTax = normalForm['idTax'] ? deconstructSelect(normalForm['idTax']) : ''
    const idPool = normalForm['idPool'] ? deconstructSelect(normalForm['idPool']) : ''


    const {
        idVendor
    } = selectReducer



    const handleInputChange = ({ target }) => {
        console.log(target)
        dispatch(handleChangeController(target.name, target.value))
    }

    useEffect(() => {
        dispatch(startAddSelectOptions('Pools', 'poolsOpt', 'fabricationName'))
        dispatch(startAddSelectOptions('Taxes', 'taxesOpt'))

        if (normalForm.id === undefined) {
            dispatch(setIdInXCode("Orders", "orderCode"))
        } else orderCode = normalForm.id

        if (normalForm.price) {
            price = normalForm.price
            dispatch(handleAddCost(price))
        }
    }, [])

    const preparePrice = () => {
        dispatch(handleCalculateTotalCost("extraItems", ""))
    }

    const setPoolInRedux = (obj) => {
         dispatch(createItemRepeatersByPool(obj.value, idTemporary))
        dispatch(handleChangeController("idPool", { id: obj.value, name: obj.label }))
        preparePrice()

    }
    

    const setIvaInRedux = (obj) => {
        dispatch(handleChangeController("idTax", { id: obj.value, name: obj.label }))
        preparePrice()
    }


    return (
        <>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <label className="control-label">Nº Pedido</label>
                        <input
                            className={`form-control`}
                            name="orderCode"
                            value={orderCode}
                            readOnly
                        />
                    </div>
                    <div className="col-md-4">
                        <Select name="idCustomer" placeholder="Cliente" label="Cliente" endpoint="Customers" labelName="comercialName" />
                    </div>
                    <div className="col-md-2">
                        <Input name="deliveryAddress" placeholder="Dirección de entrega" label="Dirección" />
                    </div>
                    <div className="col-md-2">
                        <Input name="phone" placeholder="Teléfono" label="Teléfono" />
                    </div>
                    <div className="col-md-2">
                        <Input name="email" placeholder="Correo Electrónico" label="Correo Electrónico" />
                    </div>

                    <div className="col-md-2">
                        <label className="control-label">Piscina</label>
                        <ReactSelect
                            placeholder="Piscina"
                            name="idPool"
                            value={idPool}
                            options={poolsOpt}
                            onChange={(obj) => {
                                setPoolInRedux(obj)
                            }} />
                    </div>


                    <div className="col-md-2">

                        <label className="control-label">IVA</label>
                        <ReactSelect
                            placeholder="iva"
                            name="idTax"
                            value={idTax}
                            options={taxesOpt}
                            onChange={(obj) => {
                                setIvaInRedux(obj)
                            }} />

                    </div>

                    <div className="col-md-2">
                        <label className="control-label">Precio</label>
                        <input
                            className={`form-control`}
                            name="price"
                            value={price}
                            readOnly
                        />
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
