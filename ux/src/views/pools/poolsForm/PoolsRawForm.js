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

export const PoolsRawForm = () => {

    const dispatch = useDispatch()
    const formValues = useSelector(state => state.normalForm)
    const { raws } = formValues

    const count = raws ? raws.length : 0

    const increaseCount = () => {
        dispatch(addRepeaterRegister('raws', formStructure))
    }

    useEffect(() => {
        dispatch(startAddSelectPoolItems('Items', 'Raws', 'name', 1))
    }, [])

    return (
        <>
            <h1 className="card-title">Materias primas</h1>

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

    const { idItem, cantidad } = normalForm.raws[position]

    const SelectValue = idItem.name ? deconstructSelect(idItem) : null


    const decreaseCount = () => {
        dispatch(removeRepeaterRegister('raws', position))
        dispatch(handleCalcuteTotalCost())

    }

    const handleInputChange = ({ target }) => {

        const obj = {
            name: target.name,
            value: target.value
        }

        dispatch(editRepeaterRegister('raws', position, obj))
        dispatch(
            handleSearchOutID('Items', target.value, position, 'raws')
            )
    }

    const handleSelectChange = (key, element) => {
        const el = constructSelect(element)

        const obj = {
            name: key,
            value: el
        }
        dispatch(
            editRepeaterRegister('raws', position, obj)
        )
        dispatch(
            handleSearchCost('Items', el.id, position, 'raws')
            )
    }
    return (

        <div className="row border-bottom pb-1 mx-1">
            <div className="col-md-5">
                <label className="control-label">Materia prima</label>
                <Select
                    name="idItem"
                    options={Raws}
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
