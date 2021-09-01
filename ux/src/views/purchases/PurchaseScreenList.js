import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { purchasesList } from '@fixed/purchases/purchasesList'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { handleCleanForm } from '@redux/actions/normalForm'


import '@styles/react/libs/tables/react-dataTable-component.scss'

export const PurchaseScreenList = ({titulo}) => { 

    const dispatch = useDispatch()
    const {registros:data} = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Purchases'))   
    }, [])

    return (
        <CustomDataTable title={titulo} columns={purchasesList} data={data} />
    )
}
