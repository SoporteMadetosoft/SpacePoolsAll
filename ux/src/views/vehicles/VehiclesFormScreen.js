import React, { useEffect, useState } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { VechiclesForm } from './vehiclesForm/VehiclesForm'
import { ActionButtons } from '../../components/actionButtons/ActionButtons'
import { initNormalForm } from '../../redux/actions/normalForm'

import { exceptionController } from '../../utility/helpers/undefinedExceptionController'
import { undoMultiSelect } from '../../utility/helpers/undoMultiSelect'
import { save } from '../../utility/helpers/Axios/save'

const structureForm = {
    documents: []
}

export const VehiclesFormScreen = () => {

    const { id } = useParams()

    const formValues = useSelector(state => state.normalForm)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const prettyForm = {
            ...formValues,
            isItinerant: exceptionController(formValues.isItinerant),
            status: exceptionController(formValues.status),
            idVehicleBrandModel: exceptionController(formValues.idVehicleBrandModel),
            idWarehouse: exceptionController(formValues.idWarehouse)
        }
        prettyForm.containersSupported = undoMultiSelect(prettyForm.containersSupported, 'idContainerType')
        prettyForm.garbageType = undoMultiSelect(prettyForm.garbageType, 'idGarbageType')

        save('Vehicles', id, prettyForm)
        //dispatch(handleCleanForm())


    }

    if (!formValues.plateNumber) {
        formValues.plateNumber = ''
    }

    const title = (id) ? 'Editar Vehículo' : 'Añadir Vehículo'
    const plateNumber = (formValues.plateNumber) ? formValues.plateNumber : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={plateNumber} breadCrumbParent='Vehículos' breadCrumbActive={title} />
            <form onSubmit={handleSubmit}>
                <VechiclesForm />
                <ActionButtons />
            </form>
        </>
    )
}
