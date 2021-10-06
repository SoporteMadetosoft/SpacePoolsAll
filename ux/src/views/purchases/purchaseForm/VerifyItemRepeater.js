
import Repeater from '@components/repeater'
import { useDispatch, useSelector } from 'react-redux'
import { startAddSelectOptions } from '../../../redux/actions/selects'
import React, { useEffect } from 'react'
import axios from 'axios'


import { deconstructSelect } from '../../../utility/helpers/deconstructSelect'
import { addSelectionOnNormalForm } from '../../../redux/actions/items'


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
    const { itemType, idItem, recived, pending, quantity } = normalForm.items[position]

    const idItemValue = idItem ? deconstructSelect(idItem) : null
    const itemTypeValue = itemType ? deconstructSelect(itemType) : null

    const handleLoadItems = async (obj) => {
        const nObj = {
            itemType: obj.value,
            idVendor: idVendor ? idVendor['id'] : null
        }
        const { data: { data } } = await axios.post(`${process.env.REACT_APP_HOST_URI}/items/item/listItems`, { nObj })
        dispatch(addSelectionOnNormalForm('itemsOpt', data.map(option => ({ label: option.name, value: option.id })), 'items', position))
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
                <h6>{quantity + recived}</h6>
            </div>
            <div className="col-md-2">
                <label className="control-label">Cantidad pendiente</label>
                <h6>{quantity}</h6>
            </div>
            <div className="col-md-2">
                <label className="control-label">Cantidad recibida</label>
                <input
                    type="number"
                    name="recived"
                    className="form-control"
                    placeholder={recived}
                />
            </div>



        </div>

    )
}