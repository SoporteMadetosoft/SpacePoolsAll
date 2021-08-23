import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { handleCleaningUp } from '@redux/actions/form'
import { brandList } from '@fixed/setup/vehicles/brand/brandList'

import '@styles/react/libs/tables/react-dataTable-component.scss'

export const BrandListScreen = ({titulo}) => {

    const dispatch = useDispatch()
    const {registros:data} = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleaningUp())
        dispatch(startLoadingTable('Brand'))   
    }, [])

    return (
        <CustomDataTable title={titulo} columns={brandList} data={data} />
    )
}
