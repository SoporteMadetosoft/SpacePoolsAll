import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { startLoadingTable } from '@redux/actions/custom'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { customerTypeList } from '@fixed/setup/customers/customerType/customerTypeList'
import { handleCleanForm } from '../../../../redux/actions/normalForm'

import '@styles/react/libs/tables/react-dataTable-component.scss'
import { cleanFormValidator } from '../../../../redux/actions/formValidator'

export const CustomerTypeScreenList = ({titulo}) => {

    const dispatch = useDispatch()
    const {registros:data} = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('CustomerType'))
        dispatch(cleanFormValidator())    
    }, [])

    return (
        <CustomDataTable title={titulo} columns={customerTypeList} data={data} />
    )
}
