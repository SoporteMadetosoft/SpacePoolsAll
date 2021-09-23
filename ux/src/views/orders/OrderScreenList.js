import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { handleCleanForm } from '@redux/actions/normalForm'
import { ordersList } from '@fixed/orders/ordersList'

import '@styles/react/libs/tables/react-dataTable-component.scss'
import { handleCleanCanvas } from '../../redux/actions/canvas'


export const OrderScreenList = ({titulo}) => { 

    const dispatch = useDispatch()
    const {registros:data} = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanCanvas())
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Orders'))   
    }, [])
    return (
        
        <CustomDataTable title={titulo} columns={ordersList} data={data} />
    )
}
