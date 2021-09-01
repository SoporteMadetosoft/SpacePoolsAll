import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { trailersList } from '../../fixed/vehicles/trailers/trailersList'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { handleCleanForm } from '../../redux/actions/normalForm'

import '@styles/react/libs/tables/react-dataTable-component.scss'

export const TrailersListScreen = ({ titulo }) => {

    const dispatch = useDispatch()
    const { registros: data } = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Trailers'))
    }, [])

    return (
        <CustomDataTable title={titulo} columns={trailersList} data={data} />
    )
}
