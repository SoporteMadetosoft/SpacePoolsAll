import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'
import { DynamicForm } from '@cc/form/DynamicForm'

import { carrierForm } from '@fixed/vehicles/carriers/formComposition/carrierForm'

import { handleStartEditing } from '../../redux/actions/form'
import { ActionButtons } from '../../components/actionButtons/ActionButtons'
import { save } from '../../utility/helpers/Axios/save'

export const CarrierFormScreen = () => {

    const { id } = useParams()
    
    const titulo = (id) ? 'Editar Transportista' : 'Añadir Transportista'

    const dispatch = useDispatch()
    const history = useHistory()
    const {base} = useSelector(state => state.form.formData)
    const form = useSelector(state => state.form)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Carriers', id))
        }
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        save('Carriers', id, form)
        history.push('/carriers')
    }

    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={ titulo }  breadCrumbParent='Transportista' breadCrumbActive={ titulo }  />
            <DynamicForm formCustom={ carrierForm } data={ base } />
            <ActionButtons />
        </form>
    )
}
