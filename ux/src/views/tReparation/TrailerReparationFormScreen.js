import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { startLoadingTable } from '@redux/actions/custom'

import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'
import { TrailerRepairForm } from './trailersForm/TrailerRepairForm'

const structureForm = {}

export const TrailerReparationFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('TRepair', id))
        }
        dispatch(startLoadingTable('Trailers'))
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const title = (id) ? 'Editar Reparación' : 'Añadir Reparación'
    const customerName = (form.plate) ? form.plate : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Reparación de Remolques' breadCrumbActive={title} />
            <TrailerRepairForm />
        </>
    )
}
