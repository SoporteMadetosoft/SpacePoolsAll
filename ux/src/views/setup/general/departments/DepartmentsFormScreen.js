import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BreadCrumbs from '@components/breadcrumbs'
import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { save } from '../../../../utility/helpers/Axios/save'
import { DepartmentForm } from './departmentForm/DepartmentForm'
import { startAddSelectOptions } from '../../../../redux/actions/selects'

export const DepartmentsFormScreen = () => {
 
    const { id } = useParams()

    const titulo = (id) ? 'Editar departamento' : 'Añadir departamento'
   
    const dispatch = useDispatch()
    const history = useHistory()
    const form = useSelector(state => state.normalForm)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        save('Departments', id, form)
        dispatch(startAddSelectOptions('/setup/general/department', 'departmentOpt'))
        history.push('/setup/general/departments')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Departamentos' breadCrumbActive={titulo} />
            <DepartmentForm />
            <ActionButtons />
        </form>
    )
}
