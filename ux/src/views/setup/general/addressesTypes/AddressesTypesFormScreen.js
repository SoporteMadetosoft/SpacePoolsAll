import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { handleStartEditing } from '../../../../redux/actions/normalForm'

import BreadCrumbs from '@components/breadcrumbs'
import { AddressesTypesForm } from './addressesTypesForm/AddressesTypesForm'

export const AddressesTypesFormScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('AddressesTypes', id))
        }
    }, [])

    const title = (id) ? 'Editar tipo de dirección' : 'Añadir tipo de dirección'
    const customName = form.name ? form.name : title

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customName} breadCrumbParent='Tipos de dirección' breadCrumbActive={title} />
            <AddressesTypesForm />
        </>
    )
}
