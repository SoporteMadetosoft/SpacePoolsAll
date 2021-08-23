import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BreadCrumbs from '@components/breadcrumbs'
import { DynamicForm } from '@cc/form/DynamicForm'
import { departmentForm } from '@fixed/setup/general/departments/formComposition/departmentForm'
import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { handleStartEditing } from '../../../../redux/actions/form'
import { save } from '../../../../utility/helpers/Axios/save'
import { startLoadingDepartments } from './redux/actions'

export const DepartmentsFormScreen = () => {
 
    const { id } = useParams()

    const titulo = (id) ? 'Editar departamento' : 'Añadir departamento'
   
    const dispatch = useDispatch()
    const history = useHistory()
    const {base} = useSelector(state => state.form.formData)
    const form = useSelector(state => state.form)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Departments', id))
        }
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        save('Departments', id, form)
        dispatch(startLoadingDepartments())
        history.push('/setup/general/departments')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Departamentos' breadCrumbActive={titulo} />
            <DynamicForm formCustom={ departmentForm } data={base} />
            <ActionButtons />
        </form>
    )
}
