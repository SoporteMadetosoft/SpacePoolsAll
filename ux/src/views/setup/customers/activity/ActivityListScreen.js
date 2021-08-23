import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { startLoadingTable } from '@redux/actions/custom'
import { handleCleaningUp } from '@redux/actions/form'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { activityList } from '@fixed/setup/customers/activity/activityList'

import '@styles/react/libs/tables/react-dataTable-component.scss'

export const ActivityScreenList = ({titulo}) => {

    const dispatch = useDispatch()
    const {registros:data} = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleaningUp())
        dispatch(startLoadingTable('Activity'))   
    }, [])

    return (
        <CustomDataTable title={titulo} columns={activityList} data={data} />
    )
}
