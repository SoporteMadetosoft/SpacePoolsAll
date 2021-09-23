import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CustomerCategoryForm } from './customerCategoryForm/CustomerCategoryForm'

export const CustomerCategoryFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('CustomerCategory', id))
        }
    }, [])

    const title = (id) ? 'Editar Categoria de cliente' : 'Añadir Categoria de cliente'
    const customName = form.name ? form.name : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Categorias de cliente' breadCrumbActive={title} />
            <CustomerCategoryForm />
        </>
    )
}
