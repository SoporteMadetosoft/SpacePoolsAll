import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BreadCrumbs from '@components/breadcrumbs'
import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { save } from '../../../../utility/helpers/Axios/save'
import { AddressesTypesForm } from './addressesTypesForm/AddressesTypesForm'
import { startAddSelectOptions } from '../../../../redux/actions/selects'

export const AddressesTypesFormScreen = () => {
 
    const { id } = useParams()

    const titulo = (id) ? 'Editar tipo de dirección' : 'Añadir tipo de dirección'
   
    const dispatch = useDispatch()
    const history = useHistory()
    const form = useSelector(state => state.normalForm)

    const handleSubmit = async (e) => {
        e.preventDefault()
        save('AddressesTypes', id, form)
        dispatch(startAddSelectOptions('/setup/general/addressesTypes', 'addresseTypesOpt'))
        history.push('/setup/general/addressesTypes')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Tipos de dirección' breadCrumbActive={titulo} />
            <AddressesTypesForm />
            <ActionButtons />
        </form>
    )
}
