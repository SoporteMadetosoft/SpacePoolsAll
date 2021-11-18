import React from 'react'
import Repeater from '@components/repeater'
import { useSelector } from 'react-redux'

import { deconstructSelect } from '../../../utility/helpers/deconstructSelect'

export const ExtraRawsRepeater = () => {

    const formValues = useSelector(state => state.normalForm)
    const { extraRaws } = formValues['orderData'] ? formValues['orderData'] : ''

    const count = extraRaws ? extraRaws.length : 0

    return (
        <>
            <h1 className="card-title">Materiales extras sin color</h1>

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
    const { idItem, quantity } = normalForm['orderData'] ? normalForm['orderData'].extraRaws[position] : ''
    const SelectValue = idItem ? deconstructSelect(idItem) : ''

    return (
        <div className="row border-bottom pb-1">
            <div className="col-md-6">
                <label className="control-label">Artículo</label>
                <input
                    type="text"
                    name="idItem"
                    className="form-control"
                    value={SelectValue.label}
                    readOnly
                />
            </div>
            <div className="col-md-6">
                <label className="control-label">Cantidad</label>
                <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    readOnly />
            </div>
        </div >

    )


}
