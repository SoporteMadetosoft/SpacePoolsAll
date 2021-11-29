import React, { useEffect } from 'react'
import Repeater from '@components/repeater'
import { X, Plus } from 'react-feather'
import { Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactSelect from 'react-select'

import { addRepeaterRegister, editRepeaterRegister, removeRepeaterRegister } from '../../../redux/actions/normalForm'
import { constructSelect, deconstructSelect } from '../../../utility/helpers/deconstructSelect'
import { startAddSelectOptions, startAddSelectPoolItems } from '../../../redux/actions/selects'
import { handleCalculateTotalCost, handleSearchOutID2 } from '../../../redux/actions/orders'
import axios from 'axios'


const formStructure = {
    idItem: '',
    quantity: '1',
    coste: 0
}

export const PoolsRawForm = () => {

    const dispatch = useDispatch()
    const formValues = useSelector(state => state.normalForm)
    const { raws } = formValues
    const count = raws ? raws.length : 0

    const increaseCount = () => {
        dispatch(addRepeaterRegister('raws', formStructure))
    }

    useEffect(() => {
        dispatch(startAddSelectPoolItems('Items', 'Raws', 'name', 1))
    }, [])

    return (
        <>
            <h1 className="card-title">Materias primas sin color</h1>

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
            <Button.Ripple className='btn-icon form-control btn-sm' color='primary' outline onClick={increaseCount}>
                <Plus size={14} />
            </Button.Ripple>
        </>
    )
}

const ItemsForm = ({ position }) => {

    const dispatch = useDispatch()
    const { normalForm, selectReducer } = useSelector(state => state)
    const { Raws } = selectReducer
    const { quantity, idItem } = normalForm.raws[position]
    const SelectValue = idItem.name ? deconstructSelect(idItem) : null
    // const SelectColor = idColor.name ? deconstructSelect(idColor) : null


    const decreaseCount = () => {
        dispatch(removeRepeaterRegister('raws', position))
        dispatch(handleCalculateTotalCost("items", "raws"))

    }

    const handleInputChange = ({ target }) => {
        const obj = {
            name: target.name,
            value: target.value
        }
        dispatch(editRepeaterRegister('raws', position, obj))
        dispatch(handleSearchOutID2('Items', position, 'raws', 'raws', 'items'))
        // dispatch(handleCalculateTotalCost("items", "raws",1))
    }


    const handleSelectChange = (key, element) => {
        const el = constructSelect(element)
        const obj = {
            name: key,
            value: el
        }
        dispatch(editRepeaterRegister('raws', position, obj))
        dispatch(handleSearchOutID2('Items', position, 'raws', 'raws', 'items'))
    }


    return (

        <div className="row border-bottom pb-1">
            <div className="col-md-5">
                <label className="control-label">Materia prima</label>
                <ReactSelect
                    placeholder="Materia prima"
                    name="idItem"
                    options={Raws}
                    onChange={(obj) => {
                        handleSelectChange('idItem', obj)
                    }}
                    value={SelectValue}
                />
            </div>

            <div className="col-md-5">
                <label className="control-label">Cantidad</label>
                <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    onChange={handleInputChange}
                    value={quantity} />
            </div>

            <div className="col-md-2 ">
                <Button.Ripple className='btn-icon form-control mt-2 btn-sm' color='danger' outline onClick={decreaseCount}>
                    <X size={14} />
                </Button.Ripple>
            </div>

        </div>

    )
}
