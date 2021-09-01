import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BreadCrumbs from '@components/breadcrumbs'
import { ActionButtons } from '../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router-dom'
import { save } from '../../../../utility/helpers/Axios/save'
import { PlaceForm } from './placeForm/PlaceForm'
import { startAddSelectOptions } from '../../../../redux/actions/selects'

export const PlaceFormScreen = () => {
 
    const { id } = useParams()

    const titulo = (id) ? 'Editar ubicación' : 'Añadir ubicación'
   
    const dispatch = useDispatch()
    const history = useHistory()

    const form = useSelector(state => state.normalForm)

    const handleSubmit = async (e) => {
        e.preventDefault()
        save('Place', id, form)
        dispatch(startAddSelectOptions('/setup/items/place', 'placeOpt'))
        history.push('/setup/items/place')
    }
    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={titulo} breadCrumbParent='Ubicaciones' breadCrumbActive={titulo} />
            <PlaceForm />
            <ActionButtons />
        </form>
    )
}
