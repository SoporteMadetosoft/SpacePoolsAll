import React from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { save } from '../../../../utility/helpers/Axios/save'
import { ActivityForm } from './activityForm/ActivityForm'
import { startAddSelectOptions } from '../../../../redux/actions/selects'

export const ActivityFormScreen = () => {
     
    const { id } = useParams()

    const titulo = (id) ? 'Editar Actividad' : 'Añadir Actividad'
   
    const dispatch = useDispatch()
    const history = useHistory()
    const form = useSelector(state => state.normalForm)

    const handleSubmit = async (e) => {
        e.preventDefault()
        save('Activity', id, form)
        dispatch(startAddSelectOptions('/setup/customers/activities', 'customerActivityOpt'))
        history.push('/setup/customer/activity')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Actividades' breadCrumbActive={titulo} />
            <ActivityForm />
            <ActionButtons />
        </form>
    )
}
