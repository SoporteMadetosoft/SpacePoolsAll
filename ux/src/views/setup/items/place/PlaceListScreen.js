import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { placeList } from '@fixed/setup/items/place/placeList'
import { handleCleanForm } from '../../../../redux/actions/normalForm'
import '@styles/react/libs/tables/react-dataTable-component.scss'

export const PlaceScreenList = ({titulo}) => {

    const dispatch = useDispatch()
    const {registros:data} = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Place'))   
    }, [])

    return (
        <CustomDataTable title={titulo} columns={placeList} data={data} />
    )
}
