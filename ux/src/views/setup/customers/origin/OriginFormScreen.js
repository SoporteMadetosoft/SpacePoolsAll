import React from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { save } from '../../../../utility/helpers/Axios/save'
import { startAddSelectOptions } from '../../../../redux/actions/selects'
import { OriginForm } from './originForm/OriginForm'

export const OriginFormScreen = () => {
                 
    const { id } = useParams()

    const titulo = (id) ? 'Editar origen' : 'Añadir origen'
   
    const dispatch = useDispatch()
    const history = useHistory()
    const form = useSelector(state => state.normalForm)

    const handleSubmit = async (e) => {
        e.preventDefault()
        save('Origin', id, form)
        dispatch(startAddSelectOptions('/setup/customers/origin', 'customerOriginOpt'))
        history.push('/setup/customer/origin')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Origenes' breadCrumbActive={titulo} />
            <OriginForm />
            <ActionButtons />
        </form>
    )
}
