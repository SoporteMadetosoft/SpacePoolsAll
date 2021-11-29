import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { tRepairList } from '../../fixed/vehicles/trailers/tRepairList'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { handleCleanForm } from '../../redux/actions/normalForm'

import '@styles/react/libs/tables/react-dataTable-component.scss'

export const TrailerReparationListScreen = ({ titulo }) => {

    const dispatch = useDispatch()
    const { id } = useParams()
    const { registros: data } = useSelector(state => state.registrosReducer)

    const repairData = data[id] !== undefined ? data[id].repairs : ''
    const plateNumber = data[id] !== undefined ? data[id].plate : ''

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Trailers'))
    }, [])

    return (
        <CustomDataTable title={`${titulo} - ${plateNumber}`} repa='/porters/trailers' columns={tRepairList} data={repairData} />
    )
}
