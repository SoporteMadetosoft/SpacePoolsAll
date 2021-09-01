import React from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { save } from '../../../../utility/helpers/Axios/save'
import { CustomerCategoryForm } from './customerCategoryForm/CustomerCategoryForm'
import { startAddSelectOptions } from '../../../../redux/actions/selects'

export const CustomerCategoryFormScreen = () => {
         
    const { id } = useParams()

    const titulo = (id) ? 'Editar Categoria de cliente' : 'Añadir Categoria de cliente'
   
    const dispatch = useDispatch()
    const history = useHistory()

    const form = useSelector(state => state.normalForm)

    const handleSubmit = async (e) => {
        e.preventDefault()
        save('CustomerCategory', id, form)
        dispatch(startAddSelectOptions('/setup/customers/category', 'customerCategoryOpt'))
        history.push('/setup/customer/category')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Categorias de cliente' breadCrumbActive={titulo} />
            <CustomerCategoryForm />
            <ActionButtons />
        </form>
    )
}
