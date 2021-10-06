
import Repeater from '@components/repeater'
import { useDispatch, useSelector } from 'react-redux'
import { startAddSelectOptions } from '../../../redux/actions/selects'
import React, { useEffect } from 'react'

export const ItemsRepeater = () => {

    const dispatch = useDispatch()
    const formValues = useSelector(state => state.normalForm)

    const { baseItems } = formValues['orderData'] ? formValues['orderData'] : ''
    const count = baseItems ? baseItems.length : 0

    useEffect(() => {
        dispatch(startAddSelectOptions('Items', 'idOpt'))
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

    const { normalForm } = useSelector(state => state)

    const { name, quantity } = normalForm['orderData'] ? normalForm['orderData'].baseItems[position] : ''

    return (

        <div className="row border-bottom pb-1 mt-1 mx-1">
            <div className="col-md-6">
                <label className="control-label">Producto</label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={name}
                    readOnly />
            </div>
            <div className="col-md-6">
                <label className="control-label">Cantidad</label>
                <input
                    type="text"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    readOnly />
            </div>
        </div>

    )
}