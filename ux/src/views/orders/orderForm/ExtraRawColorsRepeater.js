import React, { useEffect } from 'react'
import Repeater from '@components/repeater'
import { X, Plus } from 'react-feather'
import { Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactSelect from 'react-select'

import { addRepeaterRegister, editRepeaterRegister, removeRepeaterRegister } from '../../../redux/actions/normalForm'
import { constructSelect, deconstructSelect } from '../../../utility/helpers/deconstructSelect'
import { startAddSelectPoolItems } from '../../../redux/actions/selects'
import { handleCalculateTotalCost, handleSearchOutID2 } from '../../../redux/actions/orders'
import axios from 'axios'

const formStructure = {
    idItem: '',
    idColor: '',
    colores: '',
    quantity: '1',
    coste: 0
}

export const ExtraRawColorsRepeater = () => {

    const dispatch = useDispatch()
    const formValues = useSelector(state => state.normalForm)
    const { extraRawColors } = formValues

    const count = extraRawColors ? extraRawColors.length : 0

    const increaseCount = () => {
        dispatch(addRepeaterRegister('extraRawColors', formStructure))
    }

    useEffect(() => {
        dispatch(startAddSelectPoolItems('ItemColors', 'RawColors', 'name', 1))
    }, [])

    return (
        <>
            <h1 className="card-title">Materiales extras con color</h1>

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
    const { RawColors } = selectReducer
    const { idItem, colores, idColor, quantity } = normalForm.extraRawColors[position]
    const SelectValue = idItem ? deconstructSelect(idItem) : null
    const SelectColor = idColor.name ? deconstructSelect(idColor) : null


    const decreaseCount = () => {
        dispatch(removeRepeaterRegister('extraRawColors', position))
        dispatch(handleCalculateTotalCost("extraRawColors", ""))
    }

    const handleInputChange = ({ target }) => {
        const obj = {
            name: target.name,
            value: target.value
        }
        dispatch(editRepeaterRegister('extraRawColors', position, obj))
        dispatch(handleSearchOutID2('RawColors', position, 'extraRawColors', "extraRawColors"))
    }

    const handleSelectChange = (key, element) => {
        const el = constructSelect(element)
        const obj = {
            name: key,
            value: el
        }
        dispatch(editRepeaterRegister('extraRawColors', position, obj))
        dispatch(handleSearchOutID2('RawColors', position, 'extraRawColors', "extraRawColors"))
    }

    const handleLoadColors = async (obj) => {
        const token = localStorage.getItem('accessToken')

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
        dispatch(editRepeaterRegister('extraRawColors', position, objFinal))
        handleSelectChange('idItem', obj)
    }

    return (


        <div className="row border-bottom pb-1">
            <div className="col-md-4">
                <label className="control-label">Materia</label>
                <ReactSelect
                    placeholder="Materia"
                    name="idItem"
                    value={SelectValue}
                    options={RawColors}
                    onChange={(obj) => {
                        handleLoadColors(obj)
                    }} />
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
