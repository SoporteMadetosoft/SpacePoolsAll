import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'
import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'
import { save } from '../../utility/helpers/Axios/save'
import { TrailersForm } from './trailersForm/TrailersForm'
import { startAddSelectOptions } from '../../redux/actions/selects'
import { exceptionController } from '../../utility/helpers/undefinedExceptionController'

const structureForm = {}

export const TrailersFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Trailers', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const title = (id) ? 'Editar Remolque' : 'Añadir Remolque'
    const customerName = (form.plate) ? form.plate : title

    const handleSubmit = async (e) => {
        e.preventDefault()
        const prettyForm = {
            ...form,
            idStatus: exceptionController(form.idStatus),
            model: exceptionController(form.model)
        }

        save('Trailers', id, prettyForm)
        dispatch(startAddSelectOptions('/trailers/trailer', 'trailersOpt'))
        history.push('/porters/trailers')
    }

    return (
        <>
            <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Remolques' breadCrumbActive={title} />
            <form onSubmit={handleSubmit}>
                <TrailersForm />
                <ActionButtons />
            </form>
        </>
    )
}
