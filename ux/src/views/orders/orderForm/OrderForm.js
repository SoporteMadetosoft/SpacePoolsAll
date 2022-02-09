import { useDispatch, useSelector } from 'react-redux'
import { GetSetNextId, handleChangeController, handleGetForm } from '../../../redux/actions/normalForm'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ItemsRepeater } from './ItemsRepeater'
import { ExtraItemsRepeater } from './ExtraItemsRepeater'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'
import { OrderCanvas } from './OrderCanvas'
import { createItemRepeatersByPool, handleCalculateTotalCost, handleFillCustomerData } from '../../../redux/actions/orders'
import { ExtraRawsRepeater } from './ExtraRawsRepeater'
import { setErrors, setSchema } from '../../../redux/actions/formValidator'
import { validate, validator } from '../../../utility/formValidator/ValidationTypes'
import { exceptionController } from '../../../utility/helpers/undefinedExceptionController'
import { save } from '../../../utility/helpers/Axios/save'
import { handleCleanUp } from '../../../redux/actions/fileUpload'
import { Form } from 'reactstrap'
import { ActionButtons } from '../../../components/actionButtons/ActionButtons'
import { validateProduction } from '../../../utility/helpers/Axios/validateProduction'
import Swal from 'sweetalert2'
import { ExtraItemColorsRepeater } from './ExtraItemColorsRepeater'
import { ExtraRawColorsRepeater } from './ExtraRawColorsRepeater'
import { ItemColorsRepeater } from './ItemColorsRepeater'
import { AlertLoad } from '../../../redux/actions/alert'

const formSchema = {
    idCustomer: { validations: [validator.isRequired] },
    idPool: { validations: [validator.isRequired] },
    orderDate: { validations: [validator.isRequired] },
    productionDate: { validations: [validator.isRequired] },
    deliveryDate: { validations: [validator.isRequired] },
    idColor: { validations: [validator.isRequired] },
    idTax: { validations: [validator.isRequired] }
}

export const OrderForm = () => {

    const { id } = useParams()
    const history = useHistory()
    const { price } = useSelector(state => state.ordersReducer)

    const dispatch = useDispatch()

    const { normalForm, formValidator, canvasReducer } = useSelector(state => state)

    const { observations } = normalForm

    const orderDate2 = normalForm['orderDate'] ? normalForm['orderDate'] : ''
    const productionDate = normalForm['productionDate'] ? normalForm['productionDate'] : ''
    const deliveryDate = normalForm['deliveryDate'] ? normalForm['deliveryDate'] : ''

    const orderCode = id !== undefined ? id : normalForm.orderCode

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    const handleSelectChange = (name, { value, label }, labelName = 'name') => {
        dispatch(handleChangeController(name, { id: value, [labelName]: label }))
        dispatch(handleFillCustomerData(value))
    }

    useEffect(() => {

        if (id === undefined) {
            dispatch(GetSetNextId("Orders", 'orderCode'))
        }
        dispatch(setSchema(formSchema))
    }, [])

    const preparePrice = () => {
        dispatch(handleCalculateTotalCost("extraItems", ""))
    }

    const setPoolInRedux = (obj, labelName = 'name') => {
        dispatch(createItemRepeatersByPool(obj.value))
        dispatch(handleChangeController("idPool", { id: obj.value, [labelName]: obj.label }))
        preparePrice()
    }

    const setIvaInRedux = (obj) => {
        dispatch(handleChangeController("idTax", { id: obj.value, name: obj.label }))
        preparePrice()
    }

    const submit = async (e) => {
        e.preventDefault()

        const errors = validate(formValidator.schema, normalForm)

        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))
        } else {
            const form2 = dispatch(handleGetForm())
            form2.then(async (value) => {
                const prettyForm = {
                    ...value,
                    customerData: {
                        id: value.id,
                        deliveryAddress: value.deliveryAddress,
                        phone: value.phone,
                        email: value.email
                    },
                    idPool: exceptionController(value.idPool),
                    idTax: exceptionController(value.idTax),
                    idColor: exceptionController(value.idColor),
                    idCustomer: exceptionController(value.idCustomer),
                    baseItems: value.baseItems.map(bI => ({ idItem: bI.idItem, quantity: bI.quantity })),
                    baseItemColors: value.baseItemColors.map(bI => ({ idItem: bI.idItem, quantity: bI.quantity, idColor: exceptionController(bI.idColor) })),
                    extraItems: value.extraItems.map(eI => ({ idItem: eI.idItem.id, quantity: eI.quantity })),
                    extraRaws: value.extraRaws.map(eR => ({ idItem: eR.idItem.id, quantity: eR.quantity })),
                    extraItemColors: value.extraItemColors.map(eI => ({ idItem: eI.idItem.id, quantity: eI.quantity, idColor: exceptionController(eI.idColor) })),
                    extraRawColors: value.extraRawColors.map(eR => ({ idItem: eR.idItem.id, quantity: eR.quantity, idColor: exceptionController(eR.idColor) })),
                    canvas: canvasReducer.elements.map(el => ({ id: el.id, idElemento: el.idElemento, name: el.name, x: el.x, y: el.y, rotation: el.rotation }))
                }
                delete prettyForm.canvasItems
                delete prettyForm.deliveryAddress
                delete prettyForm.phone
                delete prettyForm.email

                const vp = await validateProduction('Orders', { productionDate: prettyForm.productionDate, idPool: prettyForm.idPool })
                if (vp === true) {
                    save('Orders', id, prettyForm)
                    dispatch(handleCleanUp())
                    history.push('/orders')
                } else {
                    Swal.fire({
                        title: '¡Error!',
                        text: 'Ya has alcanzado el número máximo de fabricaciones simultáneas para esa piscina ese día',
                        icon: 'error',
                        timer: 3000,
                        timerProgressBar: true,
                        customClass: {
                            confirmButton: 'btn btn-success'
                        }
                    })
                }
            })
        }
    }

    return (
        <Form onSubmit={submit}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <label className="control-label">Nº Order</label>
                        <input
                            className={`form-control`}
                            name="orderCode"
                            value={orderCode}
                            readOnly
                        />
                    </div>
                    <div className="col-md-4">
                        <Select
                            label="Cliente"
                            name="idCustomer"
                            onSelect={(obj) => {
                                handleSelectChange('idCustomer', obj, 'comercialName')
                            }}
                            endpoint='Customers'
                            labelName='comercialName'
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
                            name="idPool"
                            label="Piscina"
                            onSelect={(obj) => {
                                setPoolInRedux(obj, 'fabricationName')
                            }}
                            endpoint='Pools'
                            labelName='fabricationName'
                        />
                    </div>
                    <div className="col-md-2">
                        <Select name="idColor" label="Colores" endpoint="Colors" />
                    </div>
                    <div className="col-md-2">
                        <Select
                            name="idTax"
                            label="IVA"
                            onSelect={(obj) => {
                                setIvaInRedux(obj)
                            }}
                            endpoint='Taxes'
                        />

                    </div>

                    <div className="col-md-2">
                        <label className="control-label d-flex">Precio</label>
                        <Input
                            className={`form-control`}
                            name="price"
                            value={price}
                            readonly='readonly'
                        />
                    </div>
                    <div className="col-md-2">
                        <Input className="form-control" label="Fecha de pedido" type="date" name="orderDate" value={orderDate2} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-2">
                        <Input className="form-control" label="Fecha de producción" type="date" name="productionDate" value={productionDate} onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <Input className="form-control" label="Fecha de entrega" type="date" name="deliveryDate" value={deliveryDate} onChange={handleInputChange} />
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
                    <div className="card">
                        <div className=" card-body row px-3">
                            <ItemColorsRepeater />
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
                    <div className="card">
                        <div className=" card-body row px-3">
                            <ExtraItemColorsRepeater />
                        </div>
                    </div>
                    <div className="card">
                        <div className=" card-body row px-3">
                            <ExtraRawColorsRepeater />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <OrderCanvas />
                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}
