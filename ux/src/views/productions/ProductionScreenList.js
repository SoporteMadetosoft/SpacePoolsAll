import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { handleCleanForm } from '@redux/actions/normalForm'
import { ProductionsList } from '@fixed/productions/ProductionsList'



import '@styles/react/libs/tables/react-dataTable-component.scss'


export const ProductionScreenList = ({titulo}) => { 
    console.log("he llegado a productionscreenlist")
    const dispatch = useDispatch()
    const {registros:data} = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Productions'))   
    }, [])
    return (
        
        <CustomDataTable title={titulo} columns={ProductionsList} data={data} />
    )
}
