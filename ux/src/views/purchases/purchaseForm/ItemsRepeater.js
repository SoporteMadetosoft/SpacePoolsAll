
import Repeater from '@components/repeater'
import { X, Plus } from 'react-feather'
import { Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactSelect from 'react-select'
import { Select } from '../../../components/form/inputs/Select'
import { addSelectOptions, startAddSelectOptions } from '../../../redux/actions/selects'
import React, { useEffect } from 'react'
import axios from 'axios'

import { addRepeaterRegister, editRepeaterRegister, handleChangeController, removeRepeaterRegister } from '../../../redux/actions/normalForm'
import { constructSelect } from '../../../utility/helpers/deconstructSelect'
import { addSelectionOnNormalForm, handleSearchCost, handleSearchStock } from '../../../redux/actions/items'

const formStructure = {
    idItem: '',
    name: '',
    itemsOpt: {}
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
        dispatch(startAddSelectOptions('ItemType','idOpt'))
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
    //const {cost} = useSelector(state => state.itemsReducer)
    //const {stock} = useSelector(state => state.itemsReducer)

   
    const dispatch = useDispatch()
    const { normalForm, selectReducer } = useSelector(state => state)
    const { idOpt  } = selectReducer
    const {id, quantity } = normalForm
    const { stock, cost, itemsOpt } = normalForm.items[position]

    const decreaseCount = () => {
        dispatch(removeRepeaterRegister('items', position))
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
        console.log("pspspspsp", obj)
        console.log(position)
       dispatch(handleSearchCost('Items', obj.value, position, 'items'))
       dispatch(handleSearchStock('Items', obj.value, position, 'items'))
       console.log(cost, stock)
       
    }





    const handleLoadItems = async (obj) => {
       const { data: { data } } = await axios.get(`${process.env.REACT_APP_HOST_URI}/items/item/listItems/${obj.value}`)
       //dispatch(addSelectOptions('itemsOpt', data.map(option => ({ label: option.name, value: option.id }))))
       dispatch(addSelectionOnNormalForm('itemsOpt', data.map(option => ({ label: option.name, value: option.id })),'items',position))
       console.log(data)
       console.log(position)
       //dispatch(handleChangeController('item', ''))
    }

    return (

        <div className="row border-bottom pb-1 mt-1 mx-1">
            <div className="col-md-2">
                <label className="control-label">Tipo Producto</label>
                    <ReactSelect  
                        name="itemType"
                        options={idOpt}
                        onChange={
                            (obj) => { 
                                handleLoadItems(obj)
                                handleSelectChange("idItem",obj)
                            }
                            }
                        value={id}
                    />
            </div>
           
            <div className="col-md-2">
                <label className="control-label">Producto</label>
                    <ReactSelect 
                    name="item" 
                    options={ itemsOpt }
                    onChange = {
                        (obj) => { handleLoadStockCost(obj) }
                    }
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