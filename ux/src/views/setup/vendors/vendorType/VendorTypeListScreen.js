import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { startLoadingTable } from '@redux/actions/custom'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { vendorTypeList } from '@fixed/setup/vendors/vendorType/vendorTypeList'
import { handleCleanForm } from '../../../../redux/actions/normalForm'

import '@styles/react/libs/tables/react-dataTable-component.scss'

export const VendorTypeListScreen = ({titulo}) => {

    const dispatch = useDispatch()
    const {registros:data} = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('VendorType'))   
    }, [])

    return (
        <CustomDataTable title={titulo} columns={vendorTypeList} data={data} />
    )
}

