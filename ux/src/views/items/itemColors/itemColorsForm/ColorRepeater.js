import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Repeater from '@components/repeater'
import { Button } from 'reactstrap'

import { Plus, X } from 'react-feather'
import Select from 'react-select'
import { addRepeaterRegister, editRepeaterRegister, removeRepeaterRegister } from '../../../../redux/actions/normalForm'
import { startAddSelectOptions } from '../../../../redux/actions/selects'
import { constructSelect, deconstructSelect } from '../../../../utility/helpers/deconstructSelect'

const formStructure = {
    idColor: '',
    stock: ''
}

export const ColorRepeater = () => {

    const dispatch = useDispatch()
    const formValues = useSelector(state => state.normalForm)

    const { color } = formValues

    const count = color ? color.length : 0

    const increaseCount = () => {
        dispatch(addRepeaterRegister('color', formStructure))
    }

    useEffect(() => {
        dispatch(startAddSelectOptions('Colors', 'colorsOpt'))
    }, [])

    return (
        <>
            <h1 className="card-title mb-2">Color / Stock</h1>
            <Repeater count={count}>

                {i => {
                    const Tag = 'div'
                    return (
                        <Tag key={i} >
                            <ColorsForm position={i} />
                        </Tag>
                    )
                }}
            </Repeater>
            <Button.Ripple className='btn-icon form-control mt-1 btn-sm' color='primary' outline onClick={increaseCount}>
                <Plus size={14} />
            </Button.Ripple>
        </>
    )
}

const ColorsForm = ({ position }) => {

    const dispatch = useDispatch()
    const { normalForm, selectReducer } = useSelector(state => state)
    const { colorsOpt } = selectReducer
    const { idColor,
        stock } = normalForm.color[position]

    const SelectValue = idColor ? deconstructSelect(idColor) : null

    const decreaseCount = () => {
        dispatch(removeRepeaterRegister('color', position))
    }

    const handleInputChange = ({ target }) => {
        const obj = {
            name: target.name,
            value: target.value
        }

        dispatch(
            editRepeaterRegister('color', position, obj)
        )
    }

    const handleSelectChange = (key, element) => {
        const el = constructSelect(element)
        const obj = {
            name: key,
            value: el
        }

        dispatch(
            editRepeaterRegister('color', position, obj)
        )
    }

    return (

        <div className="row border-bottom pb-1 mt-1 mx-1">
            <div className="col-md-5">
                <label className="control-label">Colores</label>
                <Select
                    name="idColor"
                    options={colorsOpt}
                    onChange={(value) => { handleSelectChange('idColor', value) }}
                    value={SelectValue}
                />
            </div>
            <div className="col-md-5">
                <label className="control-label">Stock</label>
                <input
                    type="text"
                    name="stock"
                    className="form-control"
                    onChange={handleInputChange}
                    value={stock} />
            </div>
            <div className="col-md-2">
                <Button.Ripple className='btn-icon form-control mt-2 btn-sm' color='danger' outline onClick={decreaseCount}>
                    <X size={14} />
                </Button.Ripple>
            </div>
        </div>

    )
}