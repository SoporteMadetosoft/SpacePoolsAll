import React from 'react'
import Repeater from '@components/repeater'
import { X, Plus } from 'react-feather'
import { Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'

import { addRepeaterRegister, editRepeaterRegister, removeRepeaterRegister } from '../../../redux/actions/normalForm'

export const DocForm = () => {
  
    const dispatch = useDispatch()
    const formValues = useSelector(state => state.normalForm)
    const { documents, id } = formValues

    const count = documents ? documents.length : 0

    const increaseCount = () => {
        if (!id) {
            dispatch(addRepeaterRegister('documents'))
        }
    }

    return (
        <div className="card">
            <div className="card-header"> 
                <h1 className="card-title">Documentos</h1>
            </div>
            <div className="card-body pb-3 px-3">

                <Repeater count={count}>
                    
                    {i => {
                        const Tag = 'div'
                        return (
                            <Tag key={i} >
                                <DocsForm position={ i }/>
                            </Tag>
                        )
                    }}
                    
                </Repeater>
                <Button.Ripple className='btn-icon form-control mt-1 btn-sm' color='primary' outline onClick={increaseCount}>
                    <Plus size={14} />
                </Button.Ripple>
            </div>

        </div>
    )
}


const DocsForm = ({ position }) => {

    const dispatch = useDispatch()

    const { normalForm } = useSelector(state => state)
    
    const { docName } = normalForm.documents[position]

    const decreaseCount = () => {
        dispatch(removeRepeaterRegister('documents', position))
    }   

    const handleInputChange = ({ target }) => {

        const obj = {
            name: target.name, 
            value: target.value 
        }

        dispatch(editRepeaterRegister( 'documents', position,  obj ))
    }

    return (

        <div className="row border-bottom pb-1 mt-1 mx-1">
            <div className="col-md-6">
                <label className="control-label">Nombre del documento</label>
                <input 
                    type="text" 
                    name="docName" 
                    className="form-control"
                    onChange={ handleInputChange }
                    value={ docName }/>
            </div>
            <div className="col-md-5">
                <label className="control-label">Documento</label>
                <input type="file" name="file" className="form-control"/>
            </div>
            <div className="col-md-1">
                <Button.Ripple className='btn-icon form-control mt-2 btn-sm' color='danger' outline onClick={decreaseCount}>
                    <X size={14} />
                </Button.Ripple>
            </div>
        </div>

    )
}
