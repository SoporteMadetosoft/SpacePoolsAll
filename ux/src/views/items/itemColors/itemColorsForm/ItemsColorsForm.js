import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { Form } from 'reactstrap'



import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { Input } from '../../../../components/form/inputs/Input'
import { Select } from '../../../../components/form/inputs/Select'
import { handleCleanUp } from '../../../../redux/actions/fileUpload'
import { setErrors, setSchema } from '../../../../redux/actions/formValidator'

import { ColorRepeater } from './ColorRepeater'
import { GetSetNextId, handleChangeController } from '../../../../redux/actions/normalForm'
import { startAddSelectOptions, startAddSelectStatus } from '../../../../redux/actions/selects'
import { validate, validator } from '../../../../utility/formValidator/ValidationTypes'
import { save } from '../../../../utility/helpers/Axios/save'
import { exceptionController } from '../../../../utility/helpers/undefinedExceptionController'


const formSchema = {
    itemType: { validations: [validator.isRequired] },
    idVendor: { validations: [validator.isRequired] },
    idFamily: { validations: [validator.isRequired] },
    idPlace: { validations: [validator.isRequired] }

}

export const ItemsColorForm = () => {

    let { itemCode } = useSelector(state => state.normalForm)

    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const form = useSelector(state => state.normalForm)

    const { normalForm, formValidator } = useSelector(state => state)

    const { description } = normalForm

    useEffect(() => {
        dispatch(startAddSelectOptions('ItemType', 'ItemType'))
        dispatch(startAddSelectStatus('Vendors', 'Vendors', 'comercialName'))

        if (normalForm.id === undefined) {
            dispatch(GetSetNextId("ItemColors", 'itemCode'))
        } else itemCode = normalForm.id
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
                show: exceptionController(form.show),
                colors: form.color.map(color => ({ ...color, idColor: exceptionController(color.idColor) }))
            }
            save('ItemColors', id, prettyForm)
            dispatch(handleCleanUp())
            history.push('/items/itemColors')
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
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <ColorRepeater />
                        </div>
                    </div>
                </div>
            </div>
            <ActionButtons />
        </Form>
    )   
}
