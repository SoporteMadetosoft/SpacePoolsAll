import Repeater from '@components/repeater'
import { X } from 'react-feather'
import { Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import ReactSelect from 'react-select'
import { selectThemeColors } from '@utils'

import { editRepeaterRegister, removeRepeaterRegister } from '../../../redux/actions/normalForm'
import { handleLessPrice } from '../../../redux/actions/orders'
import { constructSelect, deconstructSelect } from '../../../utility/helpers/deconstructSelect'
import '@styles/react/libs/react-select/_react-select.scss'

export const ItemColorsRepeater = () => {

    const formValues = useSelector(state => state.normalForm)

    const { baseItemColors } = formValues

    const count = baseItemColors ? baseItemColors.length : 0

    return (
        <>
            <h1 className="card-title mb-2">Productos base con color</h1>
            <Repeater count={count}>

                {i => {
                    const Tag = 'div'
                    return (
                        <Tag key={i} >
                            <ItemsForm position={i} />
                        </Tag>
                    )
                }}
            </Repeater>
        </>
    )
}

const ItemsForm = ({ position }) => {

    const dispatch = useDispatch()
    const { normalForm } = useSelector(state => state)
    const { name, quantity, colores, idColor } = normalForm.baseItemColors[position]
    const SelectColor = idColor.name ? deconstructSelect(idColor) : null


    const decreaseCount = () => {
        dispatch(handleLessPrice(position))
        dispatch(removeRepeaterRegister('baseItemColors', position))
    }

    const handleInputChange = ({ target }) => {
        const obj = {
            name: target.name,
            value: target.value
        }
        dispatch(editRepeaterRegister('baseItemColors', position, obj))
    }

    const handleSelectChange = (key, element) => {
        const el = constructSelect(element)
        const obj = {
            name: key,
            value: el
        }
        dispatch(editRepeaterRegister('baseItemColors', position, obj))
    }

    return (

        <div className="row border-bottom pb-1">
            <div className="col-md-4">
                <label className="control-label">Producto</label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={name}
                    readOnly />
            </div>

            <div className="col-md-3">
                <label className="control-label">Color</label>
                <ReactSelect
                    placeholder="Color"
                    name="idColor"
                    options={colores}
                    classNamePrefix={'select'}
                    theme={selectThemeColors}
                    onChange={(value) => { handleSelectChange('idColor', value) }}
                    value={SelectColor}
                />
            </div>

            <div className="col-md-3">
                <label className="control-label">Cantidad</label>
                <input
                    type="text"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={handleInputChange}
                />
            </div>

            <div className="col-md-2">
                <Button.Ripple className='btn-icon form-control mt-2 btn-sm' color='danger' outline onClick={decreaseCount}>
                    <X size={14} />
                </Button.Ripple>
            </div>
        </div>
    )
}