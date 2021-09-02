import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'

import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm/index.js'
import { save } from '../../utility/helpers/Axios/save'
import { PurchaseForm } from './purchaseForm/PurchaseForm'


const structureForm = {
    items: []
}

export const PurchaseFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Purchases', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const title = (id) ? 'Editar Compra' : 'Añadir Compra'
    const customerName = form.purchasecod ? form.comercialName : title

    const handleSubmit = async (e) => {
        e.preventDefault()

        let itemsPretty = ''

        form.items.forEach(e => {
            itemsPretty = [
                {
                    ...e,
                    name: e.name.value
                }
            ]
        })

        const prettyForm = {
            ...form,
            items: [...itemsPretty]

        }
        save('Purchases', id, prettyForm)
        history.push('/purchases')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Compras' breadCrumbActive={title} />
                <PurchaseForm />
                <ActionButtons />
            </form>
        </>
    )
}
