
import Repeater from '@components/repeater'
import { X, Plus } from 'react-feather'
import { Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { startAddSelectOptions } from '../../../redux/actions/selects'
import React, { useEffect } from 'react'


import { addRepeaterRegister, editRepeaterRegister, removeRepeaterRegister } from '../../../redux/actions/normalForm'
import { handleLessPrice } from '../../../redux/actions/orders'
import { deleteCanvasElement } from '../../../redux/actions/canvas'

const formStructure = {
    id: '',
    quantity: ''
}

export const ItemsRepeater = () => {

    const dispatch = useDispatch()
    const formValues = useSelector(state => state.normalForm)

    const { baseItems } = formValues

    const count = baseItems ? baseItems.length : 0

    useEffect(() => {
        dispatch(startAddSelectOptions('Items','idOpt'))
    }, [])

    return (
        <>
            <h1 className="card-title mb-2">Productos Por Defecto</h1>
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
    const { normalForm, selectReducer } = useSelector(state => state)
    const {name, quantity } = normalForm.baseItems[position]

    const decreaseCount = () => {
        dispatch(handleLessPrice(position))
        dispatch(removeRepeaterRegister('baseItems', position))
    }

    return (

        <div className="row border-bottom pb-1 mt-1 mx-1">
            <div className="col-md-4">
                <label className="control-label">Producto</label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={name}
                    readOnly />
            </div>
            <div className="col-md-4">
                <label className="control-label">Cantidad</label>
                <input
                    type="text"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    readOnly />
            </div>

            <div className="col-md-2">
                <Button.Ripple className='btn-icon form-control mt-2 btn-sm' color='danger' outline onClick={decreaseCount}>
                    <X size={14} />
                </Button.Ripple>
            </div>
        </div>

    )
}