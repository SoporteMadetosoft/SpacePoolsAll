import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'

import '@styles/react/libs/tables/react-dataTable-component.scss'

import { handleCleanForm } from '../../redux/actions/normalForm'
import { vendorList } from '../../fixed/vendors/vendorsList'

export const VendorsListScreen = ({ titulo }) => {

    const dispatch = useDispatch()
    const { registros: data } = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Vendors'))
    }, [])

    return (
        <CustomDataTable title={titulo} columns={vendorList} data={data} />
    )
}
