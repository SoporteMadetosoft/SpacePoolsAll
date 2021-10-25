import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BrandForm } from './brandForm/BrandForm'
import { handleStartEditing } from '../../../../redux/actions/normalForm'

export const BrandFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Brand', id))
        }
    }, [])


    const title = (id) ? 'Editar Marca' : 'Añadir Marca'
    const customName = form.name ? form.name : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Marcas' breadCrumbActive={title} />
            <BrandForm />
        </>
    )
}
