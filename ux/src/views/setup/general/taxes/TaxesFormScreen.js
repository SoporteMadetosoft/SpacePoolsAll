import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BreadCrumbs from '@components/breadcrumbs'
import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { startAddSelectOptions } from '../../../../redux/actions/selects'
import { TaxesForm } from './taxesForm/TaxesForm'
import { save } from '../../../../utility/helpers/Axios/save'

export const TaxesFormScreen = () => {
 
    const { id } = useParams()

    const titulo = (id) ? 'Editar Impuesto' : 'Añadir Impuesto'
   
    const dispatch = useDispatch()
    const history = useHistory()
    const form = useSelector(state => state.normalForm)

    const handleSubmit = async (e) => {
        e.preventDefault()
        save('Tax', id, form)
        dispatch(startAddSelectOptions('/setup/general/tax', 'taxOpt'))
        history.push('/setup/general/taxes')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Impuestos' breadCrumbActive={titulo} />
            <TaxesForm />
            <ActionButtons />
        </form>
    )
}