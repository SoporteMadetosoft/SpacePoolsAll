import React, { useEffect } from 'react'
import BreadCrumbs from '@components/breadcrumbs'

import { brandForm } from '@fixed/setup/vehicles/brand/formComposition/brandForm'
import { DynamicForm } from '@cc/form/DynamicForm'
import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleStartEditing } from '../../../../redux/actions/form'
import { save } from '../../../../utility/helpers/Axios/save'

export const BrandFormScreen = () => {
                 
    const { id } = useParams()

    const titulo = (id) ? 'Editar marca' : 'Añadir marca'
   
    const dispatch = useDispatch()
    const history = useHistory()
    const {base} = useSelector(state => state.form.formData)
    const form = useSelector(state => state.form)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Brand', id))
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        save('Brand', id, form)
        history.push('/setup/vehicles/brand')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Marcas' breadCrumbActive={titulo} />
            <DynamicForm formCustom={ brandForm } data={base} />
            <ActionButtons />
        </form>
    )
}
