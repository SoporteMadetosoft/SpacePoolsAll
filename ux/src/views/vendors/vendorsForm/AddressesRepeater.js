import React, { useEffect } from 'react'
import Repeater from '@components/repeater'
import { X, Plus } from 'react-feather'
import { Button } from 'reactstrap'
import RadioButton from '@material-ui/core/Radio'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

import { addRepeaterRegister, editRepeaterRegister, handleChangeController, removeRepeaterRegister } from '../../../redux/actions/normalForm'
import { startAddSelectOptions } from '../../../redux/actions/selects'
import { constructSelect, deconstructSelect } from '../../../utility/helpers/deconstructSelect'
import { InputValidator } from '../../../components/form/inputs/InputValidator'

const formStructure = {
    addressType: '',
    address: '',
    population: '',
    province: '',
    postcode: '',
    defaultAddress: false
}

export const AddressesRepeater = () => {

    const dispatch = useDispatch()
    const formValues = useSelector(state => state.normalForm)

    const { addresses } = formValues

    const count = addresses ? addresses.length : 0

    const increaseCount = () => {
        dispatch(addRepeaterRegister('addresses', formStructure))
    }

    useEffect(() => {
        dispatch(startAddSelectOptions('AddressesTypes', 'addresseTypesOpt'))
    }, [])

    return (
        <>
            <h1 className="card-title mb-2">Direcciones</h1>
            <Repeater count={count}>

                {i => {
                    const Tag = 'div'
                    return (
                        <Tag key={i} >
                            <AddressesForm position={i} />
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

const AddressesForm = ({ position }) => {

    const repeaterName = 'addresses'
    const dispatch = useDispatch()
    const { normalForm, selectReducer } = useSelector(state => state)
    const { formValidator } = useSelector(state => state)
    const { addresseTypesOpt } = selectReducer
    const {
        addressType,
        address,
        population,
        province,
        postcode,
        defaultAddress } = normalForm.addresses[position]

    const SelectValue = addressType.name ? deconstructSelect(addressType) : null

    const decreaseCount = () => {
        dispatch(removeRepeaterRegister('addresses', position))
    }

    const handleInputChange = ({ target }) => {

        const obj = {
            name: target.name,
            value: target.value
        }

        dispatch(
            editRepeaterRegister('addresses', position, obj)
        )
    }

    const handleSelectChange = (key, element) => {
        const el = constructSelect(element)

        const obj = {
            name: key,
            value: el
        }

        dispatch(
            editRepeaterRegister('addresses', position, obj)
        )
    }

    const handleRadioChange = ({ target }) => {

        const newAddressList = normalForm.addresses.map((address, index) => {
            return { ...address, [target.name]: index === position }
        })
        dispatch(handleChangeController('addresses', newAddressList))

    }

    const RepInputValidator = ({ errMsg, target }) => {

        if (formValidator.errors[repeaterName] && formValidator.errors[repeaterName][position]) {
            return <InputValidator errMsg={errMsg} errors={formValidator.errors[repeaterName][position]} target={target} />
        }
        return <span />

    }

    return (

        <div className="row border-bottom pb-1 mt-1 mx-1">
            <div className="col-md-2">
                <label className="control-label">Tipo de dirección</label>
                <Select
                    name="addressType"
                    options={addresseTypesOpt}
                    onChange={(value) => { handleSelectChange('addressType', value) }}
                    value={SelectValue}
                />
            </div>
            <div className="col-md-2">
            <label className="control-label">Dirección {<RepInputValidator target="address" />}</label>
                <input
                    type="text"
                    id={`address-${position}`}
                    name="address"
                    className={`form-control ${formValidator.errors && formValidator.errors[repeaterName] ? 'borderless border-danger rounded' : ''}`}
                    onChange={handleInputChange}
                    value={address} />
            </div>
            <div className="col-md-2">
                <label className="control-label">Poblacíon</label>
                <input
                    type="text"
                    name="population"
                    className="form-control"
                    onChange={handleInputChange}
                    value={population} />
            </div>
            <div className="col-md-2">
                <label className="control-label">Provincia</label>
                <input
                    type="text"
                    name="province"
                    className="form-control"
                    onChange={handleInputChange}
                    value={province} />
            </div>
            <div className="col-md-2">
                <label className="control-label">Código Postal</label>
                <input
                    type="text"
                    name="postcode"
                    className="form-control"
                    onChange={handleInputChange}
                    value={postcode} />
            </div>
            <div className="col-md-1">
                <label className="control-label">Principal</label>
                <br />
                <RadioButton
                    type="radio"
                    onChange={handleRadioChange}
                    name="defaultAddress"
                    defaultValue={SelectValue}
                    checked={defaultAddress}
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