import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { handleCleaningUp } from '@redux/actions/form'
import { placeList } from '@fixed/setup/items/place/placeList'
import '@styles/react/libs/tables/react-dataTable-component.scss'

export const PlaceScreenList = ({titulo}) => {

    const dispatch = useDispatch()
    const {registros:data} = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleaningUp())
        dispatch(startLoadingTable('Place'))   
    }, [])

    return (
        <CustomDataTable title={titulo} columns={placeList} data={data} />
    )
}
