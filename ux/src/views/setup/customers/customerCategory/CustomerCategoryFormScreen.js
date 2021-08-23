import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { customerCategoryForm } from '@fixed/setup/customers/customerCategory/formComposition/customerCategoryForm'
import { DynamicForm } from '@cc/form/DynamicForm'
import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleStartEditing } from '../../../../redux/actions/form'
import { save } from '../../../../utility/helpers/Axios/save'
import { startLoadingCustomerCategory } from './redux/actions'

export const CustomerCategoryFormScreen = () => {
         
    const { id } = useParams()

    const titulo = (id) ? 'Editar Categoria de cliente' : 'Añadir Categoria de cliente'
   
    const dispatch = useDispatch()
    const history = useHistory()
    const {base} = useSelector(state => state.form.formData)
    const form = useSelector(state => state.form)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('CustomerCategory', id))
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        save('CustomerCategory', id, form)
        dispatch(startLoadingCustomerCategory())
        history.push('/setup/customer/category')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Categorias de cliente' breadCrumbActive={titulo} />
            <DynamicForm formCustom={ customerCategoryForm } data={base} />
            <ActionButtons />
        </form>
    )
}
