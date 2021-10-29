import { useDispatch, useSelector } from 'react-redux'
import { GetSetNextId, handleChangeController, handleGetForm } from '../../../redux/actions/normalForm'
import React, { useEffect } from 'react'
import { ItemsRepeater } from './ItemsRepeater'
import { ExtraItemsRepeater } from './ExtraItemsRepeater'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'
import { OrderCanvas } from './OrderCanvas'
import { startAddSelectOptions, startAddSelectStatus } from '../../../redux/actions/selects'
import { createItemRepeatersByPool, handleAddCost, handleCalculateTotalCost, handleFillCustomerData } from '../../../redux/actions/orders'
import { deconstructSelect } from '../../../utility/helpers/deconstructSelect'
import { ExtraRawsRepeater } from './ExtraRawsRepeater'
import { setErrors, setSchema } from '../../../redux/actions/formValidator'
import { validate, validator } from '../../../utility/formValidator/ValidationTypes'
import { exceptionController } from '../../../utility/helpers/undefinedExceptionController'
import { save } from '../../../utility/helpers/Axios/save'
import { handleCleanUp } from '../../../redux/actions/fileUpload'
import { Form } from 'reactstrap'


const formSchema = {
    //piscina, cliente, fecha de entrega, fecha de pedido y fecha de produccion
    idCustomer: { validations: [validator.isRequired] },
    idPool: { validations: [validator.isRequired] },
    orderDate: { validations: [validator.isRequired] },
    productionDate: { validations: [validator.isRequired] },
    deliveryDate: { validations: [validator.isRequired] }

}

export const OrderForm = () => {

    const { price } = useSelector(state => state.ordersReducer)

    let { orderCode } = useSelector(state => state.normalForm)
    const { orderDate } = useSelector(state => state.normalForm)

    const dispatch = useDispatch()

    const { normalForm, selectReducer, formValidator } = useSelector(state => state)
    const { poolsOpt, taxesOpt, Customers } = selectReducer
    const { observations } = normalForm

    const date = orderDate ? orderDate : new Date()

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
        dispatch(startAddSelectStatus('Customers', 'Customers', 'comercialName'))



        if (normalForm.id === undefined) {
            dispatch(GetSetNextId("Orders", 'orderCode'))

        } else orderCode = normalForm.id
        dispatch(setSchema(formSchema))

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

    const submit = async (e) => {
        e.preventDefault()

        const errors = validate(formValidator.schema, normalForm)
        console.log(errors)

        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))
            console.log('error')
        } else {

            const form2 = dispatch(handleGetForm())
            form2.then(async (value) => {
                const prettyForm = {
                    ...value,
                    customerData: exceptionController(value.customerData),
                    extraItems: exceptionController(value.extraItems),
                    baseItems: exceptionController(value.baseItems),
                    orderDate: exceptionController(value.orderCode),
                    productionDate: exceptionController(value.productionDate),
                    deliveryDate: exceptionController(value.deliveryDate),
                    idPool: exceptionController(value.idPool),
                    idTax: exceptionController(value.idTax),
                    idCustomer: exceptionController(value.idCustomer),
                    canvasItems: exceptionController(value.canvasItems)
                }
                 save('Orders', id, prettyForm)
                dispatch(handleCleanUp())
               history.push('/orders')
            })

        }

    }


    return (
        <Form onSubmit={submit}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <label className="control-label">Nº Pedido</label>
                        <Input
                            className={`form-control`}
                            name="orderCode"
                            value={orderCode}
                            readOnly
                        />
                    </div>
                    <div className="col-md-4">

                        <Select
                            placeholder="Cliente"
                            label="Cliente"
                            name="idCustomer"
                            value={idCustomer}
                            options={Customers}
                            onChange={(obj) => {
                                handleSelectChange('idCustomer', obj)
                            }}
                             />
                    </div>
                    <div className="col-md-2">
                        <Input name="deliveryAddress" label="Dirección" />
                    </div>
                    <div className="col-md-2">
                        <Input name="phone" label="Teléfono" />
                    </div>
                    <div className="col-md-2">
                        <Input name="email" label="Correo Electrónico" />
                    </div>

                    <div className="col-md-2">
                        <Select
                            placeholder="Piscina"
                            name="idPool"
                            label="Piscina"
                            value={idPool}
                            options={poolsOpt}
                            onChange={(obj) => {
                                setPoolInRedux(obj)
                            }} />
                    </div>


                    <div className="col-md-2">

                        <label className="control-label">IVA</label>
                        <Select
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
                        <Input
                            className={`form-control`}
                            name="price"
                            value={price}
                            readOnly
                        />
                    </div>
                    <div className="col-md-2">
                        <Input className="form-control" label="Fecha de pedido" type="date" name="orderDate" value={orderDate2} onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <Input className="form-control" label="Fecha de producción" type="date" name="productionDate" value={productionDate} onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <Input className="form-control" label="Fecha de entrega" type="date" name="deliveryDate" value={deliveryDate} onChange={handleInputChange}/>
                    </div>
                    <div className="col-md-2">
                        <Input name="deliverySchedulerStart" type="time" label="Inicio de Horario de entrega" />
                    </div>
                    <div className="col-md-2">
                        <Input name="deliverySchedulerEnd" type="time" label="Fin de Horario de entrega" />
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
        </Form>
    )
}
