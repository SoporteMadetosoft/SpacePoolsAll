import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { originForm } from '@fixed/setup/customers/origin/formComposition/originForm'
import { DynamicForm } from '@cc/form/DynamicForm'
import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleStartEditing } from '../../../../redux/actions/form'
import { save } from '../../../../utility/helpers/Axios/save'
import { startLoadingOrigin } from './redux/actions'

export const OriginFormScreen = () => {
                 
    const { id } = useParams()

    const titulo = (id) ? 'Editar origen' : 'Añadir origen'
   
    const dispatch = useDispatch()
    const history = useHistory()
    const {base} = useSelector(state => state.form.formData)
    const form = useSelector(state => state.form)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Origin', id))
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        save('Origin', id, form)
        dispatch(startLoadingOrigin())
        history.push('/setup/customer/origin')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Origenes' breadCrumbActive={titulo} />
            <DynamicForm formCustom={ originForm } data={base} />
            <ActionButtons />
        </form>
    )
}
