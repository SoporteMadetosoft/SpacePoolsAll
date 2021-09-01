import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { handleChangeController, handleStartEditing } from '../../../../../redux/actions/normalForm'

export const DepartmentForm = () => {
    const dispatch = useDispatch()

    const { id } = useParams()

    const { normalForm } = useSelector(state => state)
    const { name } = normalForm

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Departments', id))
        }
    }, [])

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    return (
        <>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-4">
                        <label className="control-label">Departamento</label>
                        <input
                            className="form-control"
                            name="name"
                            placeholder="Departamento"
                            value={name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
