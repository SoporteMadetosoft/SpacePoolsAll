import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { CarriersForm } from './carriersForm/CarriersForm'
import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'

const structureForm = {
    documents: []
}

export const CarrierFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Carriers', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const titulo = (id) ? 'Editar Transportista' : 'Añadir Transportista'
    const customerName = (form.name) ? form.name : titulo


    return (
        <>
            <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Transportista' breadCrumbActive={titulo} />
            <CarriersForm />
        </>
    )
}
