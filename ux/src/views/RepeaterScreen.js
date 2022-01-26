import React from 'react'
import Repeater from '@components/repeater'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import { X, Plus } from 'react-feather'
import RadioButton from '@material-ui/core/Radio'
import { addRepeaterRegister } from '../redux/actions/normalForm'
import { Select } from '../components/form/inputs/Select'
import { Input } from '../components/form/inputs/Input'

export const RepeaterScreen = ({ props }) => {
    const { titulo, endPoint, structure } = props
    const dispatch = useDispatch()
    const { [endPoint]: repet } = useSelector(state => state.normalForm)

    const count = repet ? repet.length : 0

    const increaseCount = () => {
        dispatch(addRepeaterRegister(endPoint, structure))
    }

    return (
        <>
            <h1 className="card-title mb-2">{titulo}</h1>
            <Repeater count={count}>

                {i => {
                    return (
                        <div key={i} >
                            <RepeaterForm position={i} endPoint={endPoint} structure={structure} />
                        </div>
                    )
                }}

            </Repeater>
            <Button.Ripple className='btn-icon form-control mt-1 btn-sm' color='primary' outline onClick={increaseCount}>
                <Plus size={14} />
            </Button.Ripple>
        </>
    )
}

const RepeaterForm = ({ position, endPoint, structure }) => {

    const dispatch = useDispatch()
    const { normalForm } = useSelector(state => state)

    const decreaseCount = () => {
        dispatch(removeRepeaterRegister(endPoint, position))
    }

    const handleSelectChange = (key, element) => {
        const el = constructSelect(element)
        const obj = {
            name: key,
            value: el
        }

        dispatch(
            editRepeaterRegister(endPoint, position, obj)
        )
    }

    const handleRadioChange = ({ target }) => {

        const newRepeaterList = normalForm[endPoint].map((repeater, index) => {
            return { ...repeater, [target.name]: index === position }
        })
        dispatch(handleChangeController(endPoint, newRepeaterList))

    }
    // TODO: Se tendrian que cambiar los defaultAddress, defaultContact, etc a default (en base de datos y demas)
    return (

        <div className="row border-bottom pb-1 mt-1 mx-1">
            {
                structure.map((e) => {
                    console.log(e)
                    const clase = `col-xs-${e.col[0]} col-md-${e.col[1]} col-lg-${e.col[2]}`
                    const Component = e.endPoint ? Select : Input
                    return (
                        <div className={clase}>
                            <Component props={e} />
                        </div>
                    )
                })
            }
            <div className="col-md-1">
                <label className="control-label">Principal</label>
                <br />
                <RadioButton
                    type="radio"
                    onChange={handleRadioChange}
                    name="default"
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