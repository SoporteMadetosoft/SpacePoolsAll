import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BrandForm } from './brandForm/BrandForm'
import { handleStartEditing } from '../../../../redux/actions/normalForm'

export const BrandFormScreen = () => {
                 
    const { id } = useParams()

    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Brand', id))
        }
    }, [])


    const title = (id) ? 'Editar marca' : 'Añadir marca'
    const customName = form.name ? form.name : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Marcas' breadCrumbActive={title} />
            <BrandForm />
        </>
    )
}
