import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { startLoadingTable } from '@redux/actions/custom'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { customerCategoryList } from '@fixed/setup/customers/customerCategory/customerCategoryList'
import { handleCleanForm } from '../../../../redux/actions/normalForm'

import '@styles/react/libs/tables/react-dataTable-component.scss'

export const CustomerCategoryScreenList = ({titulo}) => {

    const dispatch = useDispatch()
    const {registros:data} = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('CustomerCategory'))   
    }, [])

    return (
        <CustomDataTable title={titulo} columns={customerCategoryList} data={data} />
    )
}
