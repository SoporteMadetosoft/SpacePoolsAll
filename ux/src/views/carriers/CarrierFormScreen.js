import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'
import { save } from '../../utility/helpers/Axios/save'
import { CarriersForm } from './carriersForm/CarriersForm'
import { initNormalForm } from '../../redux/actions/normalForm'

const structureForm = {
    documents: []
}

export const CarrierFormScreen = () => {

    const dispatch = useDispatch()
    const { id } = useParams()
    
    const form = useSelector(state => state.form)
    const titulo = (id) ? 'Editar Transportista' : 'Añadir Transportista'
    
    useEffect(() => {
        // if (id) {
        //     dispatch(handleStartEditing('Carriers', id))
        // }
        dispatch( initNormalForm(structureForm) )
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        save('Carriers', id, form)
    }

    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={ titulo }  breadCrumbParent='Transportista' breadCrumbActive={ titulo }  />
            <CarriersForm  />
            <ActionButtons />
        </form>
    )
}
