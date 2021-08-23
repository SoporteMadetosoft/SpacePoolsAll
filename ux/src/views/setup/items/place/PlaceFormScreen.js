import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BreadCrumbs from '@components/breadcrumbs'
import { DynamicForm } from '@cc/form/DynamicForm'
import { placeForm } from '@fixed/setup/items/place/formComposition/placeForm'
import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { handleStartEditing } from '../../../../redux/actions/form'
import { save } from '../../../../utility/helpers/Axios/save'

export const PlaceFormScreen = () => {
 
    const { id } = useParams()

    const titulo = (id) ? 'Editar ubicación' : 'Añadir ubicación'
   
    const dispatch = useDispatch()
    const history = useHistory()
    const {base} = useSelector(state => state.form.formData)
    const form = useSelector(state => state.form)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Place', id))
        }
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        save('Place', id, form)
        history.push('/setup/items/place')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Ubicaciones' breadCrumbActive={titulo} />
            <DynamicForm formCustom={ placeForm } data={base} />
            <ActionButtons />
        </form>
    )
}
