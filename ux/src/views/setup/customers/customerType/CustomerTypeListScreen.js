import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { startLoadingTable } from '@redux/actions/custom'
import { handleCleaningUp } from '@redux/actions/form'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { customerTypeList } from '@fixed/setup/customers/customerType/customerTypeList'

import '@styles/react/libs/tables/react-dataTable-component.scss'

export const CustomerTypeScreenList = ({titulo}) => {

    const dispatch = useDispatch()
    const {registros:data} = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleaningUp())
        dispatch(startLoadingTable('CustomerType'))   
    }, [])

    return (
        <CustomDataTable title={titulo} columns={customerTypeList} data={data} />
    )
}
