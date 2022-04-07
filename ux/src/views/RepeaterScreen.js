import React from 'react'
import Repeater from '@components/repeater'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import { Plus } from 'react-feather'
import { addRepeaterRegister, removeRepeaterRegister } from '@redux/actions/normalForm'
import { SelectorComponent } from '../utility/helpers/selectorComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const RepeaterScreen = ({ titulo, endPoint, structure, base }) => {
    const dispatch = useDispatch()
    const { [endPoint]: repet } = useSelector(state => state.normalForm)
    return (
        <>
            <h1 className="card-title mb-0">{titulo}</h1>
            <Repeater count={repet ? repet.length : 0}>
                {i => <div key={i} ><RepeaterForm position={i} endPoint={endPoint} base={base} /></div>}
            </Repeater>
            <Button.Ripple className='btn-icon form-control mt-1 btn-sm' color='primary' outline={true} onClick={() => dispatch(addRepeaterRegister(endPoint, { ...structure[0]}))}>
                <Plus size={14} />
            </Button.Ripple>
        </>
    )
}

const RepeaterForm = ({ position, endPoint, base }) => {
    const dispatch = useDispatch()
    return (
        <div className="border-bottom pb-1 mx-1">
            <div className='d-flex justify-content-end' style={{marginTop: '5px'}} >
                <a className='text-danger' onClick={() => dispatch(removeRepeaterRegister(endPoint, position))}>
                    <FontAwesomeIcon icon={faTrash} />
                </a>
            </div>
            <div className="row">
                {
                    base.map((e, index) => {
                        const Component = SelectorComponent(e)
                        return (
                            <div className={`col-xs-${e.col[0]} col-md-${e.col[1]} col-lg-${e.col[2]}`}>
                                <Component {...e} key={index} position={position} zone={endPoint} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}