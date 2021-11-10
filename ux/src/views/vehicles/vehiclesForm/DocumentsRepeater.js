import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import Repeater from '@components/repeater'
import { Plus, X } from 'react-feather'

import { addRepeaterRegister, removeRepeaterRegister } from '../../../redux/actions/normalForm'


export const DocumentsRepeater = () => {

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
            <div className="card-body">
                <Repeater count={count}>
                    {i => {
                        const Tag = 'div'
                        return (
                            <Tag key={i} className='react-slidedown' >
                                <DocumentsForm position={ i }/>
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


const DocumentsForm = ({ position }) => {

    
    const dispatch = useDispatch()
    const document = useSelector(state => state.normalForm.documents[position])
    const { name, url} = document

    const handleInputChange = ({ target }) => {

        const obj = {
            name: target.name, 
            value: target.value 
        }

        dispatch(
            editRepeaterRegister(
                'documents',
                position, 
                obj 
            )
        )
    }

    const handleDeleteDocument = (e) => {
        e.preventDefault()
        dispatch(removeRepeaterRegister('documents', position))
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <input
                    type="text"
                    name={`name`}
                    className="form-control"
                    placeholder="Nombre"
                    value={ name }
                    onChange={ handleInputChange }
                />
            </div>
            <div className="col-md-3">
                <input 
                    type="file"
                    name={`file`} 
                    className="form-control" 
                    
                />
            </div>
            <div className="col-md-1">
                <button 
                    name={`url`} 
                    className="btn btn-primary"
                > 
                    <FontAwesomeIcon icon={ faCloudDownloadAlt } /> 
                </button>
            </div>
            <div className="col-md-1">
                <Button.Ripple color='danger' outline onClick={ handleDeleteDocument }>
                    <X size={12} />
                </Button.Ripple>
            </div>
        </div>
    )
}
