import Select from 'rc-select'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { Form } from 'reactstrap'
import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { Input } from '../../../../components/form/inputs/Input'
import { SelectArbol } from '../../../../components/form/inputs/SelectArbol'
import { handleCleanUp } from '../../../../redux/actions/fileUpload'
import { setErrors, setSchema } from '../../../../redux/actions/formValidator'
import { GetSetNextId, handleChangeController } from '../../../../redux/actions/normalForm'
import { validate, validator } from '../../../../utility/formValidator/ValidationTypes'
import { save } from '../../../../utility/helpers/Axios/save'
import { exceptionController } from '../../../../utility/helpers/undefinedExceptionController'


const formSchema = {}


export const ItemsColorForm = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)
    const { normalForm, selectReducer, formValidator } = useSelector(state => state)

    //const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(ValidationSchema) })

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    useEffect(() => {
        if (!id) {
            dispatch(GetSetNextId("ItemColors", 'id'))
        } else id = normalForm.id
        dispatch(setSchema(formSchema))
    }, [])

    const submit = async (e) => {
        e.preventDefault()

        const errors = validate(formValidator.schema, form)

        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))

        } else {
            const prettyForm = {
                ...form,
                 idColor: exceptionController(form.idColor),
                 stock: exceptionController(form.stock)
            }

            save('Colors', id, prettyForm)
            dispatch(handleCleanUp())
            history.push('/items/colors')
        }
    }

    return (
        <Form onSubmit={submit}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">

                        <label className="control-label">Nº Color</label>
                        <input
                            className={`form-control`}
                            name="id"
                            value={normalForm.id}
                            readOnly
                        />
                    </div>
                    <div className="col-md-5">
                        <SelectArbol name="idColor" label="Color"  />
                    </div>
                    <div className="col-md-5">
                        <Input name="stock" label="Stock" />
                    </div>
                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}
