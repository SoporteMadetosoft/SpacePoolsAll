
import Repeater from '@components/repeater'
import { useDispatch, useSelector } from 'react-redux'
import { startAddSelectOptions } from '../../../redux/actions/selects'
import React, { useEffect } from 'react'

import { deconstructSelect } from '../../../utility/helpers/deconstructSelect'
import { editRepeaterRegister } from '../../../redux/actions/normalForm'

export const VerifyItemColorsRepeater = () => {

    const dispatch = useDispatch()
    const formValues = useSelector(state => state.normalForm)

    const { itemColors } = formValues

    const count = itemColors ? itemColors.length : 0

    useEffect(() => {
        dispatch(startAddSelectOptions('ItemType', 'ItemType'))
    }, [])

    return (
        <>
            <h1 className="card-title mb-2">Artículos con color</h1>
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

    const { itemType, idItem, idColor, recived, quantity } = normalForm.itemColors[position]

    const cantRecibida = recived ? parseInt(recived) : 0

    const idItemValue = idItem ? deconstructSelect(idItem) : null
    const itemTypeValue = itemType ? deconstructSelect(itemType) : null
    const SelectColor = idColor ? deconstructSelect(idColor) : null

    const handleInputChange = ({ target }) => {
        const obj = {
            name: target.name,
            value: target.value
        }
        dispatch(editRepeaterRegister('itemColors', position, obj))
    }

    return (

        <div className="row border-bottom pb-1 mt-1 mx-1">
            <div className="col-md-2">
                <label className="control-label">Tipo Producto</label>
                <h6>{itemTypeValue.label}</h6>
            </div>

            <div className="col-md-4">
                <label className="control-label">Producto</label>
                <h6>{idItemValue.label} <br /> {`(${SelectColor.label})`} </h6>
            </div>

            <div className="col-md-2">
                <label className="control-label">Cantidad pedida</label>
                <h6>{quantity + cantRecibida}</h6>
            </div>
            <div className="col-md-2">
                <label className="control-label">Cantidad pendiente</label>
                <h6>{quantity}</h6>
            </div>
            <div className="col-md-2">
                <label className="control-label">Cantidad recibida</label>
                <input
                    type="number"
                    name="recived2"
                    className="form-control"
                    max={quantity}
                    readonly={
                        (quantity === 0) ?
                            ('readonly') :
                            null
                    }
                    placeholder={cantRecibida}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}