import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ActivityForm } from './activityForm/ActivityForm'
import { handleStartEditing } from '../../../../redux/actions/normalForm'

export const ActivityFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Activity', id))
        }
    }, [])

    const title = (id) ? 'Editar Actividad' : 'Añadir Actividad'
    const customName = form.name ? form.name : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Actividades' breadCrumbActive={title} />
            <ActivityForm />
        </>
    )
}
