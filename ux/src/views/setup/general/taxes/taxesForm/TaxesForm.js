import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { handleChangeController, handleStartEditing } from '../../../../../redux/actions/normalForm'

export const TaxesForm = () => {
    const dispatch = useDispatch()

    const { id } = useParams()

    const { normalForm } = useSelector(state => state)
    const { name, value } = normalForm

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Tax', id))
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
                        <label className="control-label">Porcentage de impuesto</label>
                        <input
                            className="form-control"
                            name="name"
                            placeholder="Porcentage"
                            value={name}
                            onChange={handleInputChange}
                            required
                            type="number"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
