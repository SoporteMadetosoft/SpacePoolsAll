import React, { useEffect, useState } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'
import { initNormalForm } from '../../redux/actions/normalForm'
import { cleanSelectOptions } from '../../redux/actions/selects'
import { save } from '../../utility/helpers/Axios/save'
import { TrailersForm } from './trailersForm/TrailersForm'

const structureForm = {
    documents: []
}

export const TrailersFormScreen = () => {

    const { id } = useParams()

    const formValues = useSelector(state => state.normalForm)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(cleanSelectOptions())
        dispatch(initNormalForm(structureForm))
    }, [cleanSelectOptions, initNormalForm])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const prettyForm = {
            ...formValues
        }

        save('Vehicles', id, prettyForm)
        //dispatch(handleCleanForm())

    }
    const title = (id) ? 'Editar Remolque' : 'Añadir Remolque'
    const plateNumber = (formValues.plateNumber) ? formValues.plateNumber : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={plateNumber} breadCrumbParent='remolques' breadCrumbActive={title} />
            <form onSubmit={ handleSubmit }>
                <TrailersForm />
                <ActionButtons />
            </form>
        </>
    )
}
