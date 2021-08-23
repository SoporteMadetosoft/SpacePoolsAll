import React from 'react'
import { X } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import { handleRepeaterFormDelete } from '@redux/actions/form'

export const RepeaterFormContent = ({formCustom, position, idObject, idGroup}) => {

    const dispatch = useDispatch()
    const { [idGroup]: group } = useSelector(state => state.form.formData)

    const deleteForm = e => {
        e.preventDefault()
        dispatch( handleRepeaterFormDelete(idGroup, idObject) )
    }
    return (
        <>
            <div className="col-md-11 mb-2" style={{ display: 'inline-block'}}>
                <div className="row" style={{ display: 'flex'}}>
                    {
                        formCustom.map(element => {
                            
                            const [ , field_name ] = element.field_id.split('-')

                            const value = typeof group[position] !== 'undefined'
                            ? group[position][field_name]
                            : ''
                            
                            return <element.Component  

                                {...element}
                                field_id={`${element.field_id}-${idObject}`}
                                field_value={ value }
                                key={`${element.field_id}-${idObject}`}
                            />
                        })
                    }
                </div>
            </div>
            <div className="col-md-1" style={{ display: 'inline-block'}}>
                <Button.Ripple color='danger' className='btn-sm mt-2' onClick={deleteForm} outline>
                        <X size={12} />
                </Button.Ripple>
            </div>
            <hr/>
        </>
    )
}
