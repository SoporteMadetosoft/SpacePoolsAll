import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ModelForm } from './modelForm/ModelForm'
import { handleStartEditing } from '../../../../redux/actions/normalForm'

export const ModelFormScreen = () => {

    const { id } = useParams()

    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Model', id))
        }
    }, [])

    const title = (id) ? 'Editar modelo' : 'Añadir modelo'
    const customName = form.name ? form.name : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Modelos' breadCrumbActive={title} />
            <ModelForm />
        </>
    )
}
