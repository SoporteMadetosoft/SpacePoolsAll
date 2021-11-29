import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { logList } from '../../fixed/logs/logList'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { handleCleanForm } from '../../redux/actions/normalForm'

import '@styles/react/libs/tables/react-dataTable-component.scss'

export const LogsListScreen = ({ titulo }) => {

    const dispatch = useDispatch()
    const { registros: data } = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Logs'))
    }, [])

    return (
        <CustomDataTable title={titulo} columns={logList} data={data} add={0} />
    )
}