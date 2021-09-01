import React from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { save } from '../../../../utility/helpers/Axios/save'
import { BrandForm } from './brandForm/BrandForm'
import { startAddSelectOptions } from '../../../../redux/actions/selects'

export const BrandFormScreen = () => {
                 
    const { id } = useParams()

    const titulo = (id) ? 'Editar marca' : 'Añadir marca'
   
    const dispatch = useDispatch()
    const history = useHistory()
    const form = useSelector(state => state.normalForm)

    const handleSubmit = async (e) => {
        e.preventDefault()
        save('Brand', id, form)
        dispatch(startAddSelectOptions('/setup/vehicles/brand', 'brandOpt'))
        history.push('/setup/vehicles/brand')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Marcas' breadCrumbActive={titulo} />
            <BrandForm />
            <ActionButtons />
        </form>
    )
}
