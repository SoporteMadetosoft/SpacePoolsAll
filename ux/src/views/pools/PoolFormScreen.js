import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { GetSetNextId, handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'
import { PoolsForm } from './poolsForm/PoolsForm'

const structureForm = {
    items: [],
    raws: []
}

export const PoolFormScreen = () => {
    let { poolCode } = useSelector(state => state.normalForm)
    const { id } = useParams()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)
    const { normalForm } = useSelector(state => state)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Pools', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    useEffect(() => {
        if (normalForm.id === undefined) {
            dispatch(GetSetNextId("Pools", 'poolCode'))

        } else poolCode = normalForm.id
    }, [id])

    const titulo = (id) ? 'Editar Piscina' : 'Añadir Piscina'
    const customerName = (form.name) ? form.name : titulo

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Piscinas' breadCrumbActive={titulo} />
            <PoolsForm />
        </>
    )
}
