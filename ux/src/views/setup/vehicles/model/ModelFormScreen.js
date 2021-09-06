import React from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { startAddSelectOptions } from '../../../../redux/actions/selects'
import { save } from '../../../../utility/helpers/Axios/save'
import { ModelForm } from './modelForm/ModelForm'
import { exceptionController } from '../../../../utility/helpers/undefinedExceptionController'

export const ModelFormScreen = () => {

    const { id } = useParams()

    const titulo = (id) ? 'Editar modelo' : 'Añadir modelo'

    const dispatch = useDispatch()
    const history = useHistory()
    const form = useSelector(state => state.normalForm)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const prettyForm = {
            ...form,
            idBrand: exceptionController(form.idBrand)
        }
        save('Model', id, prettyForm)
        dispatch(startAddSelectOptions('/setup/vehicles/brandModel', 'modelOpt'))
        history.push('/setup/vehicles/model')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Modelos' breadCrumbActive={titulo} />
            <ModelForm />
            <ActionButtons />
        </form>
    )
}
