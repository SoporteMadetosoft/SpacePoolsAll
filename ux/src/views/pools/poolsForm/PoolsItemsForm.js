import React, { useEffect } from 'react'
import Repeater from '@components/repeater'
import { X, Plus } from 'react-feather'
import { Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

import { addRepeaterRegister, editRepeaterRegister, removeRepeaterRegister } from '../../../redux/actions/normalForm'
import { constructSelect, deconstructSelect } from '../../../utility/helpers/deconstructSelect'
import { startAddSelectOptions, startAddSelectPoolItems } from '../../../redux/actions/selects'
import { handleAddCost, handleCalcuteTotalCost, handleSearchCost, handleSearchOutID } from '../../../redux/actions/pools'

const formStructure = {
    idItem: '',
    cantidad: '1',
    coste: 0
}

export const PoolsItemsForm = () => {

    const dispatch = useDispatch()
    const formValues = useSelector(state => state.normalForm)
    const { items } = formValues

    const count = items ? items.length : 0

    const increaseCount = () => {
        dispatch(addRepeaterRegister('items', formStructure))
    }

    useEffect(() => {
        dispatch(startAddSelectPoolItems('Items', 'Items', 'name', 2))
    }, [])

    return (
        <>
            <h1 className="card-title">Artículos</h1>

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
            <Button.Ripple className='btn-icon form-control btn-sm' color='primary' outline onClick={increaseCount}>
                <Plus size={14} />
            </Button.Ripple>
        </>
    )
}

const ItemsForm = ({ position }) => {

    const dispatch = useDispatch()

    const { normalForm, selectReducer } = useSelector(state => state)
    const { Items } = selectReducer
    const { idItem, cantidad } = normalForm.items[position]
    const SelectValue = idItem.name ? deconstructSelect(idItem) : null

    const decreaseCount = () => {
        dispatch(removeRepeaterRegister('items', position))
        dispatch(handleCalcuteTotalCost())
    }

    const handleInputChange = ({ target }) => {
        console.log(target.name) //cantidad (obj.name), items(key), position (position)
        const obj = {
            name: target.name,
            value: target.value
        }
        dispatch(
            editRepeaterRegister('items', position, obj)
            )
        dispatch(
            handleSearchOutID('Items', target.value, position, 'items')
            )
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
        dispatch(
            handleSearchCost('Items', el.id, position, 'items')
            )
    }
    
    return (


        <div className="row border-bottom pb-1 mx-1">
            <div className="col-md-5">
                <label className="control-label">Artículo</label>
                <Select
                    name="idItem"
                    options={Items}
                    onChange={(value) => { handleSelectChange('idItem', value) }}
                    value={SelectValue}
                />
            </div>
            <div className="col-md-5">
                <label className="control-label">Cantidad</label>
                <input
                    type="number"
                    name="cantidad"
                    className="form-control"
                    onChange={handleInputChange}
                    value={cantidad} />
            </div>

            <div className="col-md-2 ">
                <Button.Ripple className='btn-icon form-control mt-2 btn-sm' color='danger' outline onClick={decreaseCount}>
                    <X size={14} />
                </Button.Ripple>
            </div>
        </div>

    )
}
