import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { ActionButtons } from '../../../components/actionButtons/ActionButtons'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'
import { handleCleanUp } from '../../../redux/actions/fileUpload'
import { GetSetNextId, handleChangeController } from '../../../redux/actions/normalForm'
import { save } from '../../../utility/helpers/Axios/save'
import { exceptionController } from '../../../utility/helpers/undefinedExceptionController'
import { Form } from 'reactstrap'
import { startAddSelectOptions, startAddSelectStatus } from '../../../redux/actions/selects'

import { validate, validator } from '../../../utility/formValidator/ValidationTypes'
import { setErrors, setSchema } from '../../../redux/actions/formValidator'

const formSchema = {
    itemType: { validations: [validator.isRequired] },
    idVendor: { validations: [validator.isRequired] },
    idFamily: { validations: [validator.isRequired] },
    idPlace: { validations: [validator.isRequired] }

}

export const ItemForm = () => {


    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const form = useSelector(state => state.normalForm)

    const { normalForm, formValidator } = useSelector(state => state)

    const { description } = normalForm

    const itemCode = id !== undefined ? id : normalForm.itemCode

    useEffect(() => {
        dispatch(startAddSelectOptions('ItemType', 'ItemType'))
        dispatch(startAddSelectStatus('Vendors', 'Vendors', 'comercialName'))

        if (id === undefined) {
            dispatch(GetSetNextId("Items", 'itemCode'))
        }
        dispatch(setSchema(formSchema))
    }, [])

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    const submit = async (e) => {
        e.preventDefault()

        const errors = validate(formValidator.schema, form)

        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))

        } else {
            const prettyForm = {
                ...form,
                idVendor: exceptionController(form.idVendor),
                itemType: exceptionController(form.itemType),
                idFamily: exceptionController(form.idFamily),
                idPlace: exceptionController(form.idPlace),
                show: exceptionController(form.show)
            }
            save('Items', id, prettyForm)
            dispatch(handleCleanUp())
            history.push('/items')
        }
    }

    return (
        <Form onSubmit={submit}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <label className="control-label">Nº Artículo</label>
                        <input
                            className={`form-control`}
                            name="itemCode"
                            value={itemCode}
                            readOnly
                        />
                    </div>
                    <div className="col-md-4">
                        <Input name="name" label="Nombre" />
                    </div>
                    <div className="col-md-3">
                        <Select name="idFamily" label="Familia" endpoint="Family" />
                    </div>
                    <div className="col-md-3">
                        <Select required="true" name="itemType" label="Tipo de artículo" endpoint="ItemType" />
                    </div>
                    <div className="col-md-3">
                        <Select required="true" name="idVendor" label="Proveedor" endpoint="Vendors" labelName="comercialName" />
                    </div>
                    <div className="col-md-3">
                        <Select name="idPlace" label="Ubicación" endpoint="Place" />
                    </div>
                    <div className="col-md-3">
                        <Input type="number" name="stock" label="Stock" />
                    </div>

                    <div className="col-md-3">
                        <Input type="number" name="minimumStock" label="Stock mínimo" />
                    </div>
                    <div className="col-md-3">
                        <Input type="number" name="priceVATout" label="Precio sin IVA" />
                    </div>
                    <div className="col-md-3">
                        <Input type="number" name="priceVATin" label="Precio con IVA" />
                    </div>
                    <div className="col-md-3">
                        <Input type="number" name="cost" label="Coste" />
                    </div>
                    <div className="col-md-3">
                        <Input type="number" name="maximumCost" label="Coste máximo" />
                    </div>
                    <div className="col-md-3">
                        <Select name="show" label="Mostrar en albaran" endpoint="Show" />
                    </div>

                    <div className="col-md-12">
                        <label className="control-label">Descripción</label>
                        <textarea
                            className="form-control"
                            name="description"
                            placeholder="Descripción"
                            value={description}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}
