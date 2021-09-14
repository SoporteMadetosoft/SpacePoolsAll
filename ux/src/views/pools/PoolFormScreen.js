import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'
import { save } from '../../utility/helpers/Axios/save'
import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'
import { handleCleanUp } from '../../redux/actions/fileUpload'
import { PoolsForm } from './poolsForm/PoolsForm'
import { exceptionController } from '../../utility/helpers/undefinedExceptionController'

const structureForm = {
    items: [],
    raws: []
}

export const PoolFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Pools', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const titulo = (id) ? 'Editar Piscina' : 'Añadir Piscina'
    const customerName = (form.name) ? form.name : titulo

    const handleSubmit = async (e) => {
        e.preventDefault()

        const prettyForm = {
            ...form,
            idStatus: exceptionController(form.idStatus),
            items: form.items.map(item => ({ ...item, idItem: exceptionController(item.idItem) })),
            raws: form.raws.map(raw => ({ ...raw, idItem: exceptionController(raw.idItem) }))
        }
        console.log(prettyForm)
        save('Pools', id, prettyForm)
        dispatch(handleCleanUp())
        history.push('/pools')
    }

    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Piscinas' breadCrumbActive={titulo} />
            <PoolsForm />
            <ActionButtons />
        </form>
    )
}
