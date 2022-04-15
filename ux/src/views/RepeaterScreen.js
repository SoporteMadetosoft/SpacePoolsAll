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
                {i => <div key={i} >
                    <div className="border-bottom pb-1 mx-1">
                        <div className='d-flex justify-content-end' style={{marginTop: '5px'}} >
                            <a className='text-danger' onClick={() => dispatch(removeRepeaterRegister(endPoint, i))}>
                                <FontAwesomeIcon icon={faTrash} />
                            </a>
                        </div>
                    <div className="row">
                    {//TODO - REFACTORIZAR para corregir el problema de que no se puede eliminar un registro
                        base.map((e, index) => {
                            const Component = SelectorComponent(e)
                            console.log(e.name, index, i)
                            return (
                                <div className={`col-xs-${e.col[0]} col-md-${e.col[1]} col-lg-${e.col[2]}`}>
                                    <Component {...e} key={index} position={i} zone={endPoint} />
                                </div>
                            )
                        })
                    }
            </div>
        </div>
                    </div>}
            </Repeater>
            <Button.Ripple className='btn-icon form-control mt-1 btn-sm' color='primary' outline={true} onClick={() => dispatch(addRepeaterRegister(endPoint, { ...structure[0]}))}>
                <Plus size={14} />
            </Button.Ripple>
        </>
    )
}