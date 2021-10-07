import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'

import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm/index.js'
import { ViewForm } from './purchaseForm/ViewForm'

const structureForm = {
    items: []
}

export const ViewPurchaseScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Purchases', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const title = (id) ? 'Ver Compra' : 'Ver Compra'

    const handleSubmit = async (e) => {
        e.preventDefault()
        history.push('/purchases')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <BreadCrumbs breadCrumbTitle={title} breadCrumbParent='Compras' breadCrumbActive={title} />
                <ViewForm />
                <ActionButtons />
            </form>
        </>
    )
}
