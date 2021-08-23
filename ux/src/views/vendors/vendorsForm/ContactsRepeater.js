import React from 'react'
import Repeater from '@components/repeater'
import { X, Plus } from 'react-feather'
import { Button } from 'reactstrap'
import RadioButton from '@material-ui/core/Radio'
import { useDispatch, useSelector } from 'react-redux'

import { addRepeaterRegister, editRepeaterRegister, removeRepeaterRegister } from '../../../redux/actions/normalForm'

export const ContactsRepeater = () => {
  
    const dispatch = useDispatch()
    const formValues = useSelector(state => state.normalForm)
    const { contacts, id } = formValues

    const count = contacts ? contacts.length : 0

    const increaseCount = () => {
        if (!id) {
            dispatch(addRepeaterRegister('contacts'))
        }
    }

    return (
        <>
            <h1 className="card-title mb-2">Personas de contacto</h1>
            
            <Repeater count={count}>
                
                {i => {
                    const Tag = 'div'
                    return (
                        <Tag key={i} >
                            <ContactsForm position={ i }/>
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


const ContactsForm = ({ position }) => {

    const dispatch = useDispatch()

    const { normalForm } = useSelector(state => state)
    
    const { 
        name,
        phone,
        email,
        charge,
        schedule,
        department } = normalForm.contacts[position]

    const decreaseCount = () => {
        dispatch(removeRepeaterRegister('contacts', position))
    }   

    const handleInputChange = ({ target }) => {

        const obj = {
            name: target.name, 
            value: target.value 
        }

        dispatch(editRepeaterRegister( 'contacts', position,  obj ))
    }

    return (

        <div className="row border-bottom pb-1 mt-1 mx-1">
            <div className="col-md-3">
                <label className="control-label">Nombre del contacto</label>
                <input 
                type="text" 
                name="name" 
                className="form-control" 
                onChange={ handleInputChange }
                value={ name }/>
            </div>
            <div className="col-md-2">
                <label className="control-label">Telefono</label>
                <input 
                type="text" 
                name="phone" 
                className="form-control" 
                onChange={ handleInputChange }
                value={ phone }/>
            </div>
            <div className="col-md-3">
                <label className="control-label">Correo Electrónico</label>
                <input 
                type="text" 
                name="email" 
                className="form-control" 
                onChange={ handleInputChange }
                value={ email }/>
            </div>
            <div className="col-md-2">
                <label className="control-label">cargo</label>
                <input 
                type="text" 
                name="charge" 
                className="form-control" 
                onChange={ handleInputChange }
                value={ charge }/>
            </div>
            <div className="col-md-1">
                <label className="control-label">Principal</label>
                <br/>
                <RadioButton type="radio" name="defaultContact"/>
            </div>
            <div className="col-md-1">
                <Button.Ripple className='btn-icon form-control mt-2 btn-sm' color='danger' outline onClick={decreaseCount}>
                    <X size={14} />
                </Button.Ripple>
            </div>
            <div className="col-md-3">
                <label className="control-label">Horario de contacto</label>
                <input 
                type="text" 
                name="schedule" 
                className="form-control" 
                onChange={ handleInputChange }
                value={ schedule }/>
            </div>
            <div className="col-md-2">
                <label className="control-label">Departamento</label>
                <input 
                type="text" 
                name="department" 
                className="form-control" 
                onChange={ handleInputChange }
                value={ department }/>
            </div>
        </div>

    )
}
