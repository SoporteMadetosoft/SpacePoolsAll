import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { customerList } from '@fixed/customers/customersList'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { handleCleaningUp } from '@redux/actions/form'


import '@styles/react/libs/tables/react-dataTable-component.scss'

export const CustomerScreenList = ({titulo}) => { 

    const dispatch = useDispatch()
    const {registros:data} = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleaningUp())
        dispatch(startLoadingTable('Customers'))   
    }, [])

    return (
        <CustomDataTable title={titulo} columns={customerList} data={data} />
    )
}
