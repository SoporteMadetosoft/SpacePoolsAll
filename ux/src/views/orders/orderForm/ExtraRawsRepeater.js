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
import '@styles/react/libs/react-select/_react-select.scss'

const formStructure = {
    idItem: '',
    quantity: 1,
    coste: 0
}

export const ExtraRawsRepeater = () => {

    const dispatch = useDispatch()
    const formValues = useSelector(state => state.normalForm)
    const { extraRaws } = formValues

    const count = extraRaws ? extraRaws.length : 0

    const increaseCount = () => {
        dispatch(addRepeaterRegister('extraRaws', formStructure))
    }

    useEffect(() => {
        dispatch(startAddSelectPoolItems('Items', 'Raws', 'name', 1))
    }, [])

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
            <Button.Ripple className='btn-icon form-control btn-sm' color='primary' outline onClick={increaseCount}>
                <Plus size={14} />
            </Button.Ripple>
        </>
    )
}

const ItemsForm = ({ position }) => {

    const dispatch = useDispatch()

    const { normalForm, selectReducer } = useSelector(state => state)
    const { Raws } = selectReducer
    const { idItem, quantity } = normalForm.extraRaws[position]
    const SelectValue = idItem ? deconstructSelect(idItem) : null


    const decreaseCount = () => {
        dispatch(removeRepeaterRegister('extraRaws', position))
        dispatch(handleCalculateTotalCost("extraRaws", ""))
    }

    const handleInputChange = ({ target }) => {
        const obj = {
            name: target.name,
            value: target.value
        }
        dispatch(editRepeaterRegister('extraRaws', position, obj))
        dispatch(handleSearchOutID2('Items', position, 'extraRaws', "extraRaws"))
    }


    const handleSelectChange = (key, element) => {
        const el = constructSelect(element)
        const obj = {
            name: key,
            value: el
        }
        dispatch(
            editRepeaterRegister('extraRaws', position, obj)
        )
        dispatch(
            handleSearchOutID2('Items', position, 'extraRaws', "extraRaws")
        )
    }

    return (


        <div className="row border-bottom pb-1">
            <div className="col-md-5">
                <label className="control-label">Materia</label>
                <ReactSelect
                    placeholder="Materia"
                    name="idItem"
                    value={SelectValue}
                    options={Raws}
                    classNamePrefix={'select'}
                    theme={selectThemeColors}
                    onChange={(obj) => {
                        handleSelectChange('idItem', obj)
                    }} />
            </div>
            <div className="col-md-5">
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
