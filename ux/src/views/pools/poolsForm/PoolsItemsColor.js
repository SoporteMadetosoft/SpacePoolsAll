import React, { useEffect } from 'react'
import Repeater from '@components/repeater'
import { X, Plus } from 'react-feather'
import { Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactSelect from 'react-select'
import { selectThemeColors } from '@utils'

import { addRepeaterRegister, editRepeaterRegister, removeRepeaterRegister } from '../../../redux/actions/normalForm'
import { constructSelect, deconstructSelect } from '../../../utility/helpers/deconstructSelect'
import { startAddSelectPoolItems } from '../../../redux/actions/selects'
import { handleCalculateTotalCost, handleSearchOutID2 } from '../../../redux/actions/orders'
import axios from 'axios'
import '@styles/react/libs/react-select/_react-select.scss'

const formStructure = {
    idItem: '',
    idColor: '',
    colores: '',
    quantity: '1',
    coste: 0
}

export const PoolsItemsColor = () => {

    const dispatch = useDispatch()
    const formValues = useSelector(state => state.normalForm)
    const { itemColor } = formValues

    const count = itemColor ? itemColor.length : 0

    const increaseCount = () => {
        dispatch(addRepeaterRegister('itemColor', formStructure))
    }

    useEffect(() => {
        dispatch(startAddSelectPoolItems('ItemColors', 'ItemsColors', 'name', 2))
    }, [])

    return (
        <>
            <h1 className="card-title">Artículos con color</h1>

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
    const { ItemsColors } = selectReducer
    const { colores, quantity, idItem, idColor } = normalForm.itemColor[position]
    const SelectValue = idItem.name ? deconstructSelect(idItem) : null
    const SelectColor = idColor.name ? deconstructSelect(idColor) : null


    const decreaseCount = () => {
        dispatch(removeRepeaterRegister('itemColor', position))
        dispatch(handleCalculateTotalCost("items", "itemColor"))
    }

    const handleInputChange = ({ target }) => {
        const obj = {
            name: target.name,
            value: target.value
        }
        dispatch(editRepeaterRegister('itemColor', position, obj))
        dispatch(handleSearchOutID2('Items', position, 'itemColor', 'itemColor', 'items'))
    }


    const handleSelectChange = (key, element) => {
        const el = constructSelect(element)
        const obj = {
            name: key,
            value: el
        }
        dispatch(editRepeaterRegister('itemColor', position, obj))
        dispatch(handleSearchOutID2('Items', position, 'itemColor', 'itemColor', 'items'))
    }

    const handleLoadColors = async (obj) => {
        const token = localStorage.getItem('accessToken') || ''

        const { data: { data } } = await axios.get(`${process.env.REACT_APP_HOST_URI}/items/itemColors/selectByIdItem/${obj.value}`, {
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            }
        })

        const colors = data.map(option => ({ label: option.idColor.name, value: option.idColor.id }))
        const objFinal = {
            name: 'colores',
            value: colors
        }
        dispatch(editRepeaterRegister('itemColor', position, objFinal))
        handleSelectChange('idItem', obj)
    }


    return (


        <div className="row border-bottom pb-1">
            <div className="col-md-4">
                <label className="control-label">Artículo</label>
                <ReactSelect
                    placeholder="Artículo"
                    name="idItem"
                    value={SelectValue}
                    classNamePrefix={'select'}
                    theme={selectThemeColors}
                    options={ItemsColors}
                    onChange={(obj) => {
                        handleLoadColors(obj)
                    }}
                />
            </div>
            <div className="col-md-3">
                <label className="control-label">Color</label>
                <ReactSelect
                    placeholder="Color"
                    name="idColor"
                    options={colores}
                    classNamePrefix={'select'}
                    theme={selectThemeColors}
                    onChange={(value) => { handleSelectChange('idColor', value) }}
                    value={SelectColor}
                />
            </div>


            <div className="col-md-3">
                <label className="control-label">Cantidad</label>

                <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    onChange={handleInputChange}
                    value={quantity} />
            </div>
            <div className="col-md-2 ">
                <Button.Ripple className='btn-icon form-control mt-2 btn-sm' color='danger' outline onClick={decreaseCount}>
                    <X size={14} />
                </Button.Ripple>
            </div>
        </div >

    )


}
