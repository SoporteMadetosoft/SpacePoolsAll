import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { activityForm } from '@fixed/setup/customers/activity/formComposition/activityForm'
import { DynamicForm } from '@cc/form/DynamicForm'
import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleStartEditing } from '../../../../redux/actions/form'
import { startLoadingActivities } from './redux/actions'
import { save } from '../../../../utility/helpers/Axios/save'

export const ActivityFormScreen = () => {
     
    const { id } = useParams()

    const titulo = (id) ? 'Editar Actividad' : 'Añadir Actividad'
   
    const dispatch = useDispatch()
    const history = useHistory()
    const {base} = useSelector(state => state.form.formData)
    const form = useSelector(state => state.form)
    
    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Activity', id))
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        save('Activity', id, form)
        dispatch(startLoadingActivities())
        history.push('/setup/customer/activity')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Actividades' breadCrumbActive={titulo} />
            <DynamicForm formCustom={ activityForm } data={base} />
            <ActionButtons />
        </form>
    )
}
