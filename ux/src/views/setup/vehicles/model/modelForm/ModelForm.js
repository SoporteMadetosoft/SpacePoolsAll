import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetSetNextId, handleChangeController, handleStartEditing } from '../../../../../redux/actions/normalForm'
import { save } from '../../../../../utility/helpers/Axios/save'
import { Form, Input as InputValid, FormFeedback } from 'reactstrap'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form'
import { ActionButtons } from '../../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router'
import ReactSelect from 'react-select'
import { startAddSelectOptions } from '../../../../../redux/actions/selects'
import { deconstructSelect } from '../../../../../utility/helpers/deconstructSelect'
import { exceptionController } from '../../../../../utility/helpers/undefinedExceptionController'
import { validate, validator } from '../../../../../utility/formValidator/ValidationTypes'
import { Select } from '../../../../../components/form/inputs/Select'
import { Input } from '../../../../../components/form/inputs/Input'
import { setErrors, setSchema } from '../../../../../redux/actions/formValidator'


const formSchema = {
    name: { validations: [validator.isRequired] },
    idBrand :{ validations: [validator.isRequired] }
}


const placeholderStyles = {
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            FontSize: '5px'
        }
    }
}

export const ModelForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    
    const form = useSelector(state => state.normalForm)

    const { normalForm, formValidator } = useSelector(state => state)

    useEffect(() => {
        dispatch(startAddSelectOptions('Brand', 'Brand'))

        if (normalForm.id === undefined) {
            dispatch(GetSetNextId("Brand", 'id'))
        } else id = normalForm.id
        dispatch(setSchema(formSchema))
    }, [])


    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    const handleSelectChange = ({ value, label }) => {
        dispatch(handleChangeController('idBrand', { id: value, name: label }))
    }


    const submit = async (e) => {
        e.preventDefault()

        const errors = validate(formValidator.schema, form)

        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))

        } else {
            const prettyForm = {
            ...normalForm,
            idBrand: exceptionController(normalForm.idBrand),
            name: exceptionController(normalForm.name)
        }
        save('Model', id, prettyForm)
        history.push('/setup/vehicles/model')
        }
    }


    const valueBrand = normalForm['idBrand'] ? deconstructSelect(normalForm['idBrand']) : ''

    return (
        <Form onSubmit={submit}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-4">
                        <Select  required="true" name="idBrand" label="Marca" endpoint="Brand" onChange={handleSelectChange}/>
                    </div>
                    <div className="col-md-4">
                        <Input required="true" name="name" type="text" label="Modelo"onChange={handleInputChange}/>
                    </div>
                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}