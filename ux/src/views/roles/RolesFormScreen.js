import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RolesForm } from './rolesForm/RolesForm'
import { handleStartEditing } from '../../redux/actions/normalForm'
import { handleFillPermissions, setInitialPermissions } from '../../redux/actions/permisos'

export const RolesFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const { normalForm: form, permisosReducer } = useSelector(state => state)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Roles', id))
            dispatch(handleFillPermissions('Roles', id))
            // dispatch(setInitialCanvas())
        } else {
            dispatch(setInitialPermissions())
        }
    }, [])

    const title = (id) ? 'Editar Roles' : 'Añadir Roles'
    const customName = form.name ? form.name : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Roles' breadCrumbActive={title} />
            <RolesForm />
        </>
    )
}
