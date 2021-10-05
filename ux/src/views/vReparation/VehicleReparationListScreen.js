import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { vRepairList } from '../../fixed/vehicles/vehicles/vRepairList'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { handleCleanForm } from '../../redux/actions/normalForm'

import '@styles/react/libs/tables/react-dataTable-component.scss'

export const VehicleReparationListScreen = ({ titulo }) => {

    const dispatch = useDispatch()
    const { id } = useParams()
    const { registros: data } = useSelector(state => state.registrosReducer)

    const repairData = data[id] !== undefined ? data[id].repairs : ''
    const plateNumber = data[id] !== undefined ? data[id].plate : ''

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Vehicles'))
    }, [])

    return (
        <CustomDataTable title={`${titulo} - ${plateNumber}`} columns={vRepairList} data={repairData} />
    )
}
