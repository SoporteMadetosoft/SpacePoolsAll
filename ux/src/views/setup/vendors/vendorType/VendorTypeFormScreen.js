import React from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { startAddSelectOptions } from '../../../../redux/actions/selects'
import { VendorTypeForm } from './vendorTypeForm/VendorTypeForm'
import { save } from '../../../../utility/helpers/Axios/save'

export const VendorTypeFormScreen = () => {
                 
    const { id } = useParams()

    const titulo = (id) ? 'Editar tipo de vendedor' : 'Añadir tipo de vendedor'
   
    const dispatch = useDispatch()
    const history = useHistory()
    const form = useSelector(state => state.normalForm)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        save('VendorType', id, form)
        dispatch(startAddSelectOptions('/setup/vendors/type', 'vendorTypesOpt'))
        history.push('/setup/vendors/vendorType')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Tipos de proveedor' breadCrumbActive={titulo} />
            <VendorTypeForm />
            <ActionButtons />
        </form>
    )
}
