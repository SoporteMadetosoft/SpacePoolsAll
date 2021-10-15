import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'

import { Form } from 'reactstrap'
import { Input } from '../../../components/form/inputs/Input'

import { handleCleanUp } from '../../../redux/actions/fileUpload'
import { GetSetNextId, handleChangeController, handleGetForm } from '../../../redux/actions/normalForm'
import { save } from '../../../utility/helpers/Axios/save'

import { ActionButtons } from '../../../components/actionButtons/ActionButtons'

export const TrailerRepairForm = () => {

    const { id, index } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const { normalForm } = useSelector(state => state)
    const { registros: data } = useSelector(state => state.registrosReducer)

    const idRepair = id !== undefined ? id : normalForm.idRepair

    // const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(ValidationSchema) })

    const { description } = normalForm

    useEffect(() => {
        if (id === undefined) {
            dispatch(GetSetNextId("TRepair", 'idRepair'))
        }
    }, [])

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    const submit = async (e) => {
        e.preventDefault()
        const form2 = dispatch(handleGetForm())
        form2.then(async (value) => {
            delete value.idRepair
            const prettyForm = {
                ...value,
                idTrailer: value.idTrailer !== undefined ? value.idTrailer : data[index].id
            }

            save('TRepair', id, prettyForm)
            dispatch(handleCleanUp())
            history.push(`/porters/trailers/tReparation/${index}`)
        })
    }
    console.log(idRepair)
    return (
        // <Form onSubmit={handleSubmit(submit)}>
        <Form onSubmit={submit}>
            <div className="card">
                <div className="row card-body">
                    <div className="col-md-3">
                        <label className="control-label">Nº Reparación</label>
                        <input
                            className={`form-control`}
                            name="idRepair"
                            value={idRepair}
                            readOnly
                        />
                    </div>
                    <div className="col-md-3">
                        <Input type="date" name="date" label="Fecha" />
                    </div>
                    <div className="col-md-3">
                        <Input name="garage" label="Taller" />
                    </div>
                    <div className="col-md-3">
                        <Input name="cost" label="Coste de reparación" />
                    </div>

                    <div className="col-md-12">
                        <label className="control-label">Descripción de la reparación</label>
                        <textarea
                            className="form-control"
                            placeholder="Descripción de la reparación"
                            name="description"
                            defaultValue={description}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                </div>
            </div>

            <ActionButtons />

        </Form>
    )
}
