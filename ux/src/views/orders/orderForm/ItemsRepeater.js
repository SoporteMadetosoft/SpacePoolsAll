
import Repeater from '@components/repeater'
import { X, Plus } from 'react-feather'
import { Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { startAddSelectOptions } from '../../../redux/actions/selects'
import React, { useEffect } from 'react'


import { addRepeaterRegister, editRepeaterRegister, removeRepeaterRegister } from '../../../redux/actions/normalForm'

const formStructure = {
    id: '',
    quantity: ''
}

export const ItemsRepeater = () => {

    const dispatch = useDispatch()
    const formValues = useSelector(state => state.normalForm)

    const { items } = formValues

    const count = items ? items.length : 0

    const increaseCount = () => {
        dispatch(addRepeaterRegister('items', formStructure))
    }

    useEffect(() => {
        dispatch(startAddSelectOptions('Items','idOpt'))
    }, [])

    return (
        <>
            <h1 className="card-title mb-2">Productos</h1>
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
            <Button.Ripple className='btn-icon form-control mt-1 btn-sm' color='primary' outline onClick={increaseCount}>
                <Plus size={14} />
            </Button.Ripple>
        </>
    )
}

const ItemsForm = ({ position }) => {

    const dispatch = useDispatch()
    const { normalForm, selectReducer } = useSelector(state => state)
    const { idOpt } = selectReducer
    const {
        id,
        quantity } = normalForm.items[position]

    const decreaseCount = () => {
        dispatch(removeRepeaterRegister('items', position))
    }

    const handleInputChange = ({ target }) => {

        const obj = {
            name: target.name,
            value: target.value
        }

        dispatch(
            editRepeaterRegister('items', position, obj)
        )
    }

    const handleSelectChange = (key, element) => {

        const obj = {
            name: key,
            value: element
        }

        dispatch(
            editRepeaterRegister('items', position, obj)
        )
    }

    return (

        <div className="row border-bottom pb-1 mt-1 mx-1">
            <div className="col-md-2">
                <label className="control-label">Producto</label>
                <Select  
                    name="id"
                    options={idOpt}
                    onChange={(value) => { handleSelectChange('id', value) }}
                    value={id}
                    multiple
                />
            </div>
            <div className="col-md-2">
                <label className="control-label">Cantidad</label>
                <input
                    type="text"
                    name="quantity"
                    className="form-control"
                    onChange={handleInputChange}
                    value={quantity} />
            </div>

            <div className="col-md-1">
                <Button.Ripple className='btn-icon form-control mt-2 btn-sm' color='danger' outline onClick={decreaseCount}>
                    <X size={14} />
                </Button.Ripple>
            </div>
        </div>

    )
}