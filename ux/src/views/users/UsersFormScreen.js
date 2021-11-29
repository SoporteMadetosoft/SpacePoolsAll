import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleStartEditing } from '../../redux/actions/normalForm'
import { UsersForm } from './usersForm/UsersForm'

export const UsersFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Users', id))
            
        }
    }, [])

    const title = (id) ? 'Editar Usuario' : 'Añadir Usuario'
    const customName = form.name ? form.name : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Usuarios' breadCrumbActive={title} />
            <UsersForm />
        </>
    )
}
