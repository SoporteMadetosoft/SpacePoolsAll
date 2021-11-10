import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { ActionButtons } from '../../../components/actionButtons/ActionButtons'
import { Input } from '../../../components/form/inputs/Input'
import { SelectArbol } from '../../../components/form/inputs/SelectArbol'
import { handleCleanUp } from '../../../redux/actions/fileUpload'
import { save } from '../../../utility/helpers/Axios/save'
import { Form, Input as InputValid, FormFeedback } from 'reactstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import { GetSetNextId, handleChangeController } from '../../../redux/actions/normalForm'
import { setErrors, setSchema } from '../../../redux/actions/formValidator'
import { validate, validator } from '../../../utility/formValidator/ValidationTypes'
import { exceptionController } from '../../../utility/helpers/undefinedExceptionController'

// const ValidationSchema = yup.object().shape({
//     name: yup.string().required()
// })
const formSchema = {
    name: { validations: [validator.isRequired] }
}


export const ItemsFamilyForm = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)
    const { normalForm, formValidator } = useSelector(state => state)


   
    
    useEffect(() => {
        console.log(normalForm.id)
        if (!id) {
            dispatch(GetSetNextId('Family', 'id'))
        } 
        dispatch(setSchema(formSchema))
    }, [])

    const submit = async (e) => {
        e.preventDefault()

        const errors = validate(formValidator.schema, form)

        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))

        } else {
            console.log(form.parent)
            const prettyForm = {
                ...form
               
            }

            save('Family', id, prettyForm)
            dispatch(handleCleanUp())
            history.push('/items/family')
        }
    }

    return (
        <Form onSubmit={submit}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">

                        <label className="control-label">Nº Familia</label>
                        <input
                            className={`form-control`}
                            name="id"
                            value={normalForm.id}
                            readOnly
                            
                        />
                    </div>
                    <div className="col-md-5">
                        <Input required="true" name="name" label="Nombre" endpoint="Family" />
                        
                    </div>
                    <div className="col-md-5">
                        <SelectArbol name="parent" label="Padre" endpoint="Family" />
                    </div>
                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}
