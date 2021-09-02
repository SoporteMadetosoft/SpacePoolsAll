import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { handleCleanForm } from '@redux/actions/normalForm'
import { ordersList } from '@fixed/orders/ordersList'

import '@styles/react/libs/tables/react-dataTable-component.scss'


export const ProductionScreenList = ({titulo}) => { 

    const dispatch = useDispatch()
    const {registros:data} = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Productions'))   
    }, [])
    console.log( data )
    return (
        
        <CustomDataTable title={titulo} columns={ordersList} data={data} />
    )
}
