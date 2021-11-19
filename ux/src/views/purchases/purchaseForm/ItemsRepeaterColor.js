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
    idItemColor: [
        {
            id: '',
            name: ''
        }
    ],
    quantity: 1
}

export const ItemsRepeaterColor = () => {

    const dispatch = useDispatch()
    const formValues = useSelector(state => state.normalForm)

    const { items } = formValues

    const count = items ? items.length : 0

    const increaseCount = () => {
        dispatch(addRepeaterRegister('itemColors', formStructure))
    }

    useEffect(() => {
        dispatch(startAddSelectOptions('ItemType', 'ItemType'))
    }, [])


    return (
        <>
            <h1 className="card-title mb-2">Productos con color</h1>
            <Repeater count={count}>

                {i => {
                    const Tag = 'div'
                    return (
                        <Tag key={i} >
                            <ItemsFormColor position={i} />
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

const ItemsFormColor = ({ position }) => {

    const dispatch = useDispatch()
    const { normalForm, selectReducer } = useSelector(state => state)
    const { ItemType } = selectReducer
    const { idVendor } = normalForm
    const { itemType, idItem, stock, cost, colores, idColor, itemsOpt, quantity } = normalForm.items[position]

    const idItemValue = idItem ? deconstructSelect(idItem) : null
    const itemTypeValue = itemType ? deconstructSelect(itemType) : null
    const SelectColor = idColor ? deconstructSelect(idColor) : null


    const handleLoadItems = async (obj) => {
        const nObj = {
            itemType: obj.value,
            idVendor: idVendor ? idVendor['id'] : null
        }
        const token = localStorage.getItem('accessToken')

        const { data: { data } } = await axios.post(`${process.env.REACT_APP_HOST_URI}/items/itemColors/listItems`, { nObj }, {
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            }
        })
        dispatch(addSelectionOnNormalForm('itemsOpt', data.map(option => ({ label: option.name, value: option.id })), 'items', position))
    }

    useEffect(() => {
        if (itemType) {
            handleLoadItems({ label: itemType.name, value: itemType.id })
        }
    }, [itemType])

    const decreaseCount = () => {
        dispatch(removeRepeaterRegister('itemColors', position))
    }

    const handleInputChange = ({ target }) => {
        const obj = {
            name: target.name,
            value: target.value
        }

        dispatch(editRepeaterRegister('itemColors', position, obj))
    }

    const handleSelectChange = (key, element) => {
        const el = constructSelect(element)
        const obj = {
            name: key,
            value: el
        }
        dispatch(
            editRepeaterRegister('itemColors', position, obj)
        )
    }

    const handleLoadStockCost = (obj) => {
        dispatch(handleSearchCost('ItemColors', obj.value, position, 'itemColors'))
        dispatch(handleSearchStock('ItemColors', obj.value, position, 'itemColors'))
    }

    const handleLoadColors = async (obj) => {
        const token = localStorage.getItem('accessToken')

        const { data: { data } } = await axios.get(`${process.env.REACT_APP_HOST_URI}/items/itemColors/selectByIdItem/${obj.value}`, {
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            }
        })
        const colors = data.map(option => ({ label: option.name, value: option.id }))
        const objFinal = {
            name: 'colores',
            value: colors
        }
        dispatch(editRepeaterRegister('itemColors', position, objFinal))
        handleSelectChange('idItem', obj)
    }

    const costeReal = cost ? cost * quantity : 0

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
                            handleLoadColors(obj)
                        }
                    }
                    value={idItemValue}
                />
            </div>
            <div className="col-md-3">
                <label className="control-label">Color</label>
                <ReactSelect
                    placeholder="Color"
                    name="idColor"
                    options={colores}
                    onChange={(value) => { handleSelectChange('idColor', value) }}
                    value={SelectColor}
                />
            </div>
            <div className="col-md-1">
                <label className="control-label">Cantidad</label>
                <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    onChange={handleInputChange}
                    value={quantity}
                />
            </div>
            <div className="col-md-1">
                <label className="control-label">Precio</label>
                <input
                    type="text"
                    name="cost"
                    className="form-control"
                    value={costeReal}
                    readOnly />
            </div>

            <div className="col-md-1">
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