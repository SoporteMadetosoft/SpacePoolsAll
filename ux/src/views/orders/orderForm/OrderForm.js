import { useDispatch, useSelector } from 'react-redux'
import { GetSetNextId, handleChangeController } from '../../../redux/actions/normalForm'
import React, { useEffect } from 'react'
import ReactSelect from 'react-select'
import { ItemsRepeater } from './ItemsRepeater'
import { ExtraItemsRepeater } from './ExtraItemsRepeater'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'
import moment from 'moment'

import { OrderCanvas } from './OrderCanvas'

import { startAddSelectOptions } from '../../../redux/actions/selects'
import { createItemRepeatersByPool, handleAddCost, handleCalculateTotalCost, handleFillCustomerData } from '../../../redux/actions/orders'
import { deconstructSelect } from '../../../utility/helpers/deconstructSelect'
import { handleCleanCanvas } from '../../../redux/actions/canvas'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { useParams } from 'react-router'
import { ExtraRawsRepeater } from './ExtraRawsRepeater'

//const ValidationSchema = yup.object().shape({
//    idPool: yup.string().required()
//})
export const OrderForm = () => {
    //const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(ValidationSchema) })

    const { price } = useSelector(state => state.ordersReducer)

    let { orderCode } = useSelector(state => state.normalForm)
    const { orderDate } = useSelector(state => state.normalForm)

    const dispatch = useDispatch()

    const { normalForm, selectReducer } = useSelector(state => state)
    const { poolsOpt, taxesOpt, Customers } = selectReducer
    const { observations } = normalForm

    const date = orderDate ? orderDate : new Date()
    // const year = date.getFullYear()
    // const month = date.getMonth(2)
    // const dt = date.getDate()

    // if (dt < 10) {
    //     dt = `0dt`;
    //   }
    //   if (month < 10) {
    //     month = `0month`;
    //   }

    //const strDate =  `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`
    //const dateNotSelect = `${date.getFullYear()}-${(date.getMonth() + 4).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`

    // const momentDate = moment(date, "YYYY-MM-DD")

    // const momentDate2 = momentDate.clone().add(1, "months")


    // const day = momentDate.format('DD')
    // const month = momentDate.format('MM')
    // const year = momentDate.format('YYYY')
    // const day2 = momentDate2.format('DD')
    // const month2 = momentDate2.format('MM')
    // const year2 = momentDate2.format('YYYY')

    // const strDate = `${year}-${month}-${day}`
    // const dateNotSelect = `${year2}-${month2}-${day2}`

    const idTax = normalForm['idTax'] ? deconstructSelect(normalForm['idTax']) : ''
    const idPool = normalForm['idPool'] ? deconstructSelect(normalForm['idPool']) : ''
    const idCustomer = normalForm['idCustomer'] ? deconstructSelect(normalForm['idCustomer'], 'comercialName') : ''
    const orderDate2 = normalForm['orderDate'] ? normalForm['orderDate'] : ''
    const productionDate = normalForm['productionDate'] ? normalForm['productionDate'] : ''
    const deliveryDate = normalForm['deliveryDate'] ? normalForm['deliveryDate'] : ''

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))

    }

    const handleSelectChange = (name, { value, label }) => {
        dispatch(handleChangeController(name, { id: value, comercialName: label }))
        dispatch(handleFillCustomerData(value))
    }

    useEffect(() => {
        dispatch(startAddSelectOptions('Pools', 'poolsOpt', 'fabricationName'))
        dispatch(startAddSelectOptions('Taxes', 'taxesOpt'))
        dispatch(startAddSelectOptions('Customers', 'Customers', 'comercialName'))

        if (normalForm.id === undefined) {
            dispatch(GetSetNextId("Orders", 'orderCode'))
            // dispatch(handleChangeController('orderDate', orderDate2))
            // dispatch(handleChangeController('deliveryDate', deliveryDate))
        } else orderCode = normalForm.id

        if (normalForm.price) {
            //  price = normalForm.price
            //  dispatch(handleAddCost(price))
        }
    }, [])

    const preparePrice = () => {
        dispatch(handleCalculateTotalCost("extraItems", ""))
    }

    const setPoolInRedux = (obj) => {
        dispatch(createItemRepeatersByPool(obj.value))
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
                        <label className="control-label">Cliente</label>
                        <ReactSelect
                            placeholder="Cliente"
                            name="idCustomer"
                            value={idCustomer}
                            options={Customers}
                            onChange={(obj) => {
                                handleSelectChange('idCustomer', obj)
                            }} />
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
                            placeholder="IVA"
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
                        <label className="control-label">Fecha de pedido</label>
                        <input
                            className="form-control"
                            type="date"
                            name="orderDate"
                            value={orderDate2}
                            onChange={handleInputChange}
                        />

                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Fecha de producción</label>
                        <input
                            className="form-control"
                            type="date"
                            name="productionDate"
                            value={productionDate}
                            onChange={handleInputChange}
                        />

                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Fecha de entrega</label>
                        <input
                            className="form-control"
                            type="date"
                            name="deliveryDate"
                            value={deliveryDate}
                            onChange={handleInputChange}
                        />
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
                    <div className="card">
                        <div className=" card-body row px-3">
                            <ExtraRawsRepeater />
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
