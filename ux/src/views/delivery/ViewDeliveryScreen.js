import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'

import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm/index.js'
import { ViewDeliveryForm } from './purchaseForm/ViewDeliveryForm'
import { getCItemsByOrderId, setInitialCanvas } from '../../redux/actions/canvas'

const structureForm = {
    baseItems: [],
    extraItems: []
}

export const ViewDeliveryScreen = () => {

    const { id } = useParams()
    const { idOrder } = useSelector(state => state.normalForm)
    const form = useSelector(state => state.normalForm)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(handleStartEditing('Delivery', id))
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    useEffect(() => {
        if (idOrder) {
            dispatch(getCItemsByOrderId('Orders', idOrder))
        } else {
            dispatch(setInitialCanvas())
        }

    }, [form])

    const title = 'Detalles del pedido'

    const handleSubmit = async (e) => {
        e.preventDefault()
        history.push('/delivery')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <BreadCrumbs breadCrumbTitle={title} breadCrumbParent='Gestor de entregas' breadCrumbActive={title} />
                <ViewDeliveryForm />
                <ActionButtons />
            </form>
        </>
    )
}
