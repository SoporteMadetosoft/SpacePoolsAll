
import Repeater from '@components/repeater'
import { useDispatch, useSelector } from 'react-redux'
import { startAddSelectOptions } from '../../../redux/actions/selects'
import React, { useEffect } from 'react'
import axios from 'axios'


import { deconstructSelect } from '../../../utility/helpers/deconstructSelect'
import { addSelectionOnNormalForm } from '../../../redux/actions/items'
import { editRepeaterRegister } from '../../../redux/actions/normalForm'


export const VerifyItemsRepeater = () => {

    const dispatch = useDispatch()
    const formValues = useSelector(state => state.normalForm)

    const { items } = formValues

    const count = items ? items.length : 0

    useEffect(() => {
        dispatch(startAddSelectOptions('ItemType', 'ItemType'))
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

        </>
    )
}

const ItemsForm = ({ position }) => {

    const dispatch = useDispatch()
    const { normalForm } = useSelector(state => state)

    const { idVendor } = normalForm
    const { itemType, idItem, recived, quantity } = normalForm.items[position]

    const cantRecibida = recived ? parseInt(recived) : 0

    const idItemValue = idItem ? deconstructSelect(idItem) : null
    const itemTypeValue = itemType ? deconstructSelect(itemType) : null

    const handleLoadItems = async (obj) => {
        const nObj = {
            itemType: obj.value,
            idVendor: idVendor ? idVendor['id'] : null
        }
        const token = localStorage.getItem('accessToken')

        const { data: { data } } = await axios.post(`${process.env.REACT_APP_HOST_URI}/items/item/listItems`, { nObj }, {
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            }
        })
        dispatch(addSelectionOnNormalForm('itemsOpt', data.map(option => ({ label: option.name, value: option.id })), 'items', position))
    }

    const handleInputChange = ({ target }) => {
        const obj = {
            name: target.name,
            value: target.value
        }

        dispatch(editRepeaterRegister('items', position, obj))
    }

    useEffect(() => {
        if (itemType) {
            handleLoadItems({ label: itemType.name, value: itemType.id })
        }
    }, [itemType])

    return (

        <div className="row border-bottom pb-1 mt-1 mx-1">
            <div className="col-md-2">
                <label className="control-label">Tipo Producto</label>
                <h6>{itemTypeValue.label}</h6>
            </div>

            <div className="col-md-3">
                <label className="control-label">Producto</label>
                <h6>{idItemValue.label}</h6>
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