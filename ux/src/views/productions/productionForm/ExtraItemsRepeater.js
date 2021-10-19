import React, { useEffect } from 'react'
import Repeater from '@components/repeater'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

import { editRepeaterRegister } from '../../../redux/actions/normalForm'
import { constructSelect, deconstructSelect } from '../../../utility/helpers/deconstructSelect'
import { startAddSelectPoolItems } from '../../../redux/actions/selects'
import { handleSearchOutID2 } from '../../../redux/actions/orders'

export const ExtraItemsRepeater = () => {

    const dispatch = useDispatch()
    const formValues = useSelector(state => state.normalForm)
    const { extraItems } = formValues['orderData'] ? formValues['orderData'] : ''

    const count = extraItems ? extraItems.length : 0

    useEffect(() => {
        dispatch(startAddSelectPoolItems('Items', 'Items', 'name', 2))
    }, [])

    return (
        <>
            <h1 className="card-title">Productos Extras</h1>

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

    const { normalForm, selectReducer } = useSelector(state => state)
    const { Items } = selectReducer
    const { idItem, quantity, idColor } = normalForm['orderData'] ? normalForm['orderData'].extraItems[position] : ''
    const SelectValue = idItem ? deconstructSelect(idItem) : null

    return (


        <div className="row border-bottom pb-1">
            <div className="col-md-4">
                <label className="control-label">Artículo</label>
                <input
                    type="text"
                    name="idItem"
                    options={Items}
                    className="form-control"
                    value={SelectValue.label}
                    readOnly
                />
            </div>
            <div className="col-md-4">
                <label className="control-label">Color</label>
                <input
                    type="text"
                    name="color"
                    className="form-control"
                    value={idColor.name}
                    readOnly />
            </div>
            <div className="col-md-4">
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
