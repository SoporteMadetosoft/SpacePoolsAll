import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { carriersList } from '../../fixed/vehicles/carriers/carriersList'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'

import '@styles/react/libs/tables/react-dataTable-component.scss'

export const VehiclesListScreen = ({titulo}) => { 

    const dispatch = useDispatch()
    const {registros:data} = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(startLoadingTable('Vehicles'))   
    }, [])

    return (
        <CustomDataTable title={ titulo } columns={ carriersList } data={ data } />
    )
}
