import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { handleStartEditing } from '../../../../redux/actions/normalForm'

import BreadCrumbs from '@components/breadcrumbs'
import { DepartmentForm } from './departmentForm/DepartmentForm'

export const DepartmentsFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Departments', id))
        }
    }, [])

    const title = (id) ? 'Editar departamento' : 'Añadir departamento'
    const customName = form.name ? form.name : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Departamentos' breadCrumbActive={title} />
            <DepartmentForm />
        </>
    )
}
