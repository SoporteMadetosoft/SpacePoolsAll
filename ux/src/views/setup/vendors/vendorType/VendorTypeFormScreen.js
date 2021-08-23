import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { vendorTypeForm } from '@fixed/setup/vendors/vendorType/formComposition/vendorTypeForm'
import { DynamicForm } from '@cc/form/DynamicForm'
import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleStartEditing } from '../../../../redux/actions/form'

export const VendorTypeFormScreen = () => {
                 
    const { id } = useParams()

    const titulo = (id) ? 'Editar tipo de vendedor' : 'Añadir tipo de vendedor'
   
    const dispatch = useDispatch()
    const {base} = useSelector(state => state.form.formData)
    
    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('VendorType', id))
        }
    }, [])
    return (
        <form>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Tipos de proveedor' breadCrumbActive={titulo} />
            <DynamicForm formCustom={ vendorTypeForm } data={base} />
            <ActionButtons />
        </form>
    )
}
