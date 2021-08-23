import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { handleCleaningUp } from '@redux/actions/form'
import { modelList } from '@fixed/setup/vehicles/model/modelList'

import '@styles/react/libs/tables/react-dataTable-component.scss'

export const ModelListScreen = ({titulo}) => {

    const dispatch = useDispatch()
    const {registros:data} = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleaningUp())
        dispatch(startLoadingTable('Model'))   
    }, [])

    return (
        <CustomDataTable title={titulo} columns={modelList} data={data} />
    )
}
