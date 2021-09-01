import React, { useEffect, useState } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { VechiclesForm } from './vehiclesForm/VehiclesForm'
import { ActionButtons } from '../../components/actionButtons/ActionButtons'
import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'

import { exceptionController } from '../../utility/helpers/undefinedExceptionController'
import { undoMultiSelect } from '../../utility/helpers/undoMultiSelect'
import { save } from '../../utility/helpers/Axios/save'

const structureForm = {}

export const VehiclesFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Vehicles', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const title = (id) ? 'Editar Vehículo' : 'Añadir Vehículo'
    const customName = (form.plateNumber) ? form.plateNumber : title

    const handleSubmit = async (e) => {
        e.preventDefault()
        const prettyForm = {
            ...form,
            idStatus: exceptionController(form.idStatus),
            idVehicleBrandModel: exceptionController(form.idVehicleBrandModel),
            idWarehouse: exceptionController(form.idWarehouse)
        }

        save('Vehicles', id, prettyForm)
        history.push('/porters/vehicles')
    }

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Vehículos' breadCrumbActive={title} />
            <form onSubmit={handleSubmit}>
                <VechiclesForm />
                <ActionButtons />
            </form>
        </>
    )
}
