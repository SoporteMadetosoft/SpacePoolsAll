import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BreadCrumbs from '@components/breadcrumbs'
import { DynamicForm } from '@cc/form/DynamicForm'
import { addressesTypesForm } from '@fixed/setup/general/addressesTypes/formComposition/addressesTypesForm'
import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { handleStartEditing } from '../../../../redux/actions/form'
import { save } from '../../../../utility/helpers/Axios/save'
import { startLoadingAddresses } from './redux/actions'

export const AddressesTypesFormScreen = () => {
 
    const { id } = useParams()

    const titulo = (id) ? 'Editar tipo de dirección' : 'Añadir tipo de dirección'
   
    const dispatch = useDispatch()
    const history = useHistory()
    const {base} = useSelector(state => state.form.formData)
    const form = useSelector(state => state.form)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('AddressesTypes', id))
        }
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        save('AddressesTypes', id, form)
        dispatch(startLoadingAddresses())
        history.push('/setup/general/addressesTypes')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Tipos de direcciones' breadCrumbActive={titulo} />
            <DynamicForm formCustom={ addressesTypesForm } data={base} />
            <ActionButtons />
        </form>
    )
}
