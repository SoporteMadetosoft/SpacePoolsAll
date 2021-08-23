import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { startLoadingTable } from '@redux/actions/custom'
import { handleCleaningUp } from '@redux/actions/form'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { originList } from '@fixed/setup/customers/origin/originList'

import '@styles/react/libs/tables/react-dataTable-component.scss'

export const OriginScreenList = ({titulo}) => {

    const dispatch = useDispatch()
    const {registros:data} = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleaningUp())
        dispatch(startLoadingTable('Origin'))   
    }, [])

    return (
        <CustomDataTable title={titulo} columns={originList} data={data} />
    )
}
