import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { OriginForm } from './originForm/OriginForm'
import { handleStartEditing } from '../../../../redux/actions/normalForm'

export const OriginFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Origin', id))
        }
    }, [])

    const title = (id) ? 'Editar Origen' : 'Añadir Origen'
    const customName = form.name ? form.name : title


    return (
        <>
            <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Origenes' breadCrumbActive={title} />
            <OriginForm />
        </>
    )
}
