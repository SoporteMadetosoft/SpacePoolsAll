
import Repeater from '@components/repeater'
import { X, Plus } from 'react-feather'
import { Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactSelect from 'react-select'
import { startAddSelectOptions } from '../../../redux/actions/selects'
import React, { useEffect } from 'react'
import axios from 'axios'

import { addRepeaterRegister, editRepeaterRegister, removeRepeaterRegister } from '../../../redux/actions/normalForm'
import { constructSelect, deconstructSelect } from '../../../utility/helpers/deconstructSelect'
import { addSelectionOnNormalForm, handleSearchCost, handleSearchStock } from '../../../redux/actions/items'

const formStructure = {
    idItem: [
        {
        id: '',
        name: ''
    }
],
    quantity: 0
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
            <Button.Ripple className='btn-icon form-control mt-1 btn-sm' color='primary' outline onClick={increaseCount}>
                <Plus size={14} />
            </Button.Ripple>
        </>
    )
}

const ItemsForm = ({ position }) => {

    const dispatch = useDispatch()
    const { normalForm, selectReducer } = useSelector(state => state)
    const { ItemType } = selectReducer
    const { idVendor } = normalForm
    const { itemType, idItem, stock, cost, itemsOpt, quantity } = normalForm.items[position]

    const idItemValue = idItem ? deconstructSelect(idItem) : null
    const itemTypeValue = itemType ? deconstructSelect(itemType) : null

    const handleLoadItems = async (obj) => {
        console.log(obj)
        const nObj = {
            itemType: obj.value,
            idVendor: idVendor ? idVendor['id'] : null
        }
        const { data: { data } } = await axios.post(`${process.env.REACT_APP_HOST_URI}/items/item/listItems`, { nObj })
        dispatch(addSelectionOnNormalForm('itemsOpt', data.map(option => ({ label: option.name, value: option.id })), 'items', position))
    }

    useEffect(() => {
        if (itemType) {
            handleLoadItems({label: itemType.name, value: itemType.id})
        }
    }, [itemType])

    const decreaseCount = () => {
        dispatch(removeRepeaterRegister('items', position))
    }

    const handleInputChange = ({ target }) => {
        const obj = {
            name: target.name,
            value: target.value
        }

        dispatch(editRepeaterRegister('items', position, obj))
    }

    const handleSelectChange = (key, element) => {
        const el = constructSelect(element)
        const obj = {
            name: key,
            value: el
        }
        dispatch(
            editRepeaterRegister('items', position, obj)
        )
    }

    const handleLoadStockCost = (obj) => {
        dispatch(handleSearchCost('Items', obj.value, position, 'items'))
        dispatch(handleSearchStock('Items', obj.value, position, 'items'))
    }



    return (

        <div className="row border-bottom pb-1 mt-1 mx-1">
            <div className="col-md-2">
                <label className="control-label">Tipo Producto</label>
                <ReactSelect
                    name="itemType"
                    options={ItemType}
                    onChange={
                        (obj) => {
                            handleLoadItems(obj)
                            handleSelectChange("itemType", obj)
                        }
                    }
                    value={itemTypeValue}
                />
            </div>

            <div className="col-md-3">
                <label className="control-label">Producto</label>
                <ReactSelect
                    name="item"
                    options={itemsOpt}
                    onChange={
                        (obj) => {
                            handleLoadStockCost(obj)
                            handleSelectChange('idItem', obj)
                        }
                    }
                    value={idItemValue}
                />
            </div>

            <div className="col-md-2">
                <label className="control-label">Cantidad</label>
                <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    onChange={handleInputChange}
                    value={quantity}
                />
            </div>
            <div className="col-md-2">
                <label className="control-label">Precio</label>
                <input
                    type="text"
                    name="cost"
                    className="form-control"
                    value={cost}
                    readOnly />
            </div>

            <div className="col-md-2">
                <label className="control-label">Stock</label>
                <input
                    type="text"
                    name="stock"
                    className="form-control"
                    value={stock}
                    readOnly
                />
            </div>

            <div className="col-md-1">
                <Button.Ripple className='btn-icon form-control mt-2 btn-sm' color='danger' outline onClick={decreaseCount}>
                    <X size={14} />
                </Button.Ripple>
            </div>
        </div>

    )
}