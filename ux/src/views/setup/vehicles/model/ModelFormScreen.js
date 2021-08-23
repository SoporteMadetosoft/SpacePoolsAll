import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { modelForm } from '@fixed/setup/vehicles/model/formComposition/modelForm'
import { DynamicForm } from '@cc/form/DynamicForm'
import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleStartEditing } from '../../../../redux/actions/form'
import { save } from '../../../../utility/helpers/Axios/save'

export const ModelFormScreen = () => {
                 
    const { id } = useParams()

    const titulo = (id) ? 'Editar modelo' : 'Añadir modelo'
   
    const dispatch = useDispatch()
    const history = useHistory()
    const {base} = useSelector(state => state.form.formData)
    const form = useSelector(state => state.form)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Model', id))
        }
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        save('Model', id, form)
        history.push('/setup/vehicles/model')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Modelos' breadCrumbActive={titulo} />
            <DynamicForm formCustom={ modelForm } data={base} />
            <ActionButtons />
        </form>
    )
}
