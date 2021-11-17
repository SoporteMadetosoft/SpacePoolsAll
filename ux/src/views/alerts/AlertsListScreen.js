import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { alertsList } from '../../fixed/alerts/alertsList'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { handleCleanForm } from '../../redux/actions/normalForm'

import '@styles/react/libs/tables/react-dataTable-component.scss'

export const AlertsListScreen = ({ titulo }) => {

    const dispatch = useDispatch()
    const { registros: data } = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Alerts'))
    }, [])

    return (
        <CustomDataTable title={titulo} columns={alertsList} data={data} add={0} />
    )
}