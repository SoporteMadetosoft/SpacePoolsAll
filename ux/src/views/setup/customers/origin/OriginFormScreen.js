import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { OriginForm } from './originForm/OriginForm'
import { handleStartEditing } from '../../../../redux/actions/normalForm'

export const OriginFormScreen = () => {
                 
    const { id } = useParams()

    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Origin', id))
        }
    }, [])

    const title = (id) ? 'Editar origen' : 'Añadir origen'
    const customName = form.name ? form.name : title


    return (
        <>
            <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Origenes' breadCrumbActive={title} />
            <OriginForm />
        </>
    )
}
