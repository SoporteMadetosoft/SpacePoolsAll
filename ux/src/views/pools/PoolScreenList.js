import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import { poolsList } from '@fixed/pools/poolsList'
import { handleCleanForm } from '../../redux/actions/normalForm'


export const PoolScreenList = ({ titulo }) => {

    const dispatch = useDispatch()
    const { registros: data } = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Pools'))
    }, [])

    return (
        <CustomDataTable title={titulo} columns={poolsList} data={data} />
    )
}
