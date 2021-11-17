
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'
import { PoolsItemsForm } from './PoolsItemsForm'
import { PoolsRawForm } from './PoolsRawForm'
import { PoolsItemsColor } from './PoolsItemsColor'
import { PoolsRawColor } from './PoolsRawColor'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { handleCalculateTotalCost } from '../../../redux/actions/orders'
import { GetSetNextId, handleChangeController, handleGetForm } from '../../../redux/actions/normalForm'
import { setErrors, setSchema } from '../../../redux/actions/formValidator'
import Form from 'reactstrap/lib/Form'
import { validate, validator } from '../../../utility/formValidator/ValidationTypes'
import { ActionButtons } from '../../../components/actionButtons/ActionButtons'
import { handleCleanUp } from '../../../redux/actions/fileUpload'
import { exceptionController } from '../../../utility/helpers/undefinedExceptionController'
import { save } from '../../../utility/helpers/Axios/save'
import { useHistory, useParams } from 'react-router'

const formSchema = {

    idStatus: { validations: [validator.isRequired] },
    fabricationName: { validations: [validator.isRequired] }

}
export const PoolsForm = () => {
    const { id } = useParams()
    const history = useHistory()

    let { poolCode } = useSelector(state => state.normalForm)

    const { normalForm } = useSelector(state => state)
    const { formValidator } = useSelector(state => state)

    const { price } = useSelector(state => state.ordersReducer)

    const PoolPrice = normalForm.price

    const dispatch = useDispatch()

    useEffect(() => {
        if (normalForm.id === undefined) {
            dispatch(GetSetNextId("Pools", 'poolCode'))
        } else poolCode = normalForm.id
        dispatch(setSchema(formSchema))
    }, [])

    useEffect(() => {
        dispatch(handleCalculateTotalCost('raws', 'items', 1))
    }, [normalForm])


    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
        dispatch(handleCalculateTotalCost('raws', 'items', 1))
    }

    const submit = async (e) => {
        e.preventDefault()
        const errors = validate(formValidator.schema, normalForm)

        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))
        } else {

            const form2 = dispatch(handleGetForm())
            form2.then((value) => {
                const prettyForm = {
                    ...value,
                    cost: price,
                    idStatus: exceptionController(value.idStatus),
                    items: normalForm.items.map(item => ({ quantity: item.quantity, idItem: exceptionController(item.idItem) })),
                    raws: normalForm.raws.map(raw => ({ quantity: raw.quantity, idItem: exceptionController(raw.idItem) })),
                    itemColor: normalForm.itemColor.map(item => ({ quantity: item.quantity, idItem: exceptionController(item.idItem), idColor: exceptionController(item.idColor) })),
                    rawColor: normalForm.rawColor.map(raw => ({ quantity: raw.quantity, idItem: exceptionController(raw.idItem), idColor: exceptionController(raw.idColor) }))
                }
                save('Pools', id, prettyForm)
                dispatch(handleCleanUp())
                history.push('/pools')
            })
        }
    }

    return (

        <Form onSubmit={submit}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <label className="control-label">Nº Piscina</label>
                        <input
                            className={`form-control`}
                            name="poolCode"
                            value={poolCode}
                            readOnly
                        />
                    </div>
                    <div className="col-md-4">
                        <Input name="fabricationName" label="Nombre  de fabricación" />
                    </div>
                    <div className="col-md-3">
                        <Input name="simultaneousFabrications" type="number" label="Nº máximo de fabriación" />
                    </div>
                    <div className="col-md-3">
                        <Select name="idStatus" label="Estado" endpoint="Status" />
                    </div>
                    <div className="col-md-3">
                        <Input name="nameEuropa" label="Nombre Europa" />
                    </div>
                    <div className="col-md-3">
                        <Input name="nameSpace" label="Nombre Space" />
                    </div>
                    <div className="col-md-3">
                        <Input name="nameSociedad" label="Nombre Sociedad" />
                    </div>
                    <div className="col-md-3">
                        <Input name="nameHydrius" label="Nombre Hydrus" />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Precio</label>
                        <input className={`form-control`}
                            name="price"
                            placeholder="Precio"
                            onChange={handleInputChange}
                            value={PoolPrice}
                        />
                    </div>
                    <div className="col-md-3">

                        <label className="control-label">Cost</label>
                        <input
                            className={`form-control`}
                            name="cost"
                            value={price}
                            readOnly
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">

                    <div className="card">
                        <div className=" card-body row px-3">
                            <PoolsItemsForm />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className=" card-body row px-3">
                            <PoolsRawForm />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">

                    <div className="card">
                        <div className=" card-body row px-3">
                            <PoolsItemsColor />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className=" card-body row px-3">
                            <PoolsRawColor />
                        </div>
                    </div>
                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}