import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { VechiclesForm } from './vehiclesForm/VehiclesForm'
import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'


const structureForm = {
    documents: []
}

export const VehiclesFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Vehicles', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const title = (id) ? 'Editar: Vehículo' : 'Añadir Vehículo'
    const customName = (form.plateNumber) ? form.plateNumber : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Vehículos' breadCrumbActive={title} />
            <VechiclesForm />
        </>
    )
}
