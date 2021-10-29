import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import { carriersList } from '@fixed/vehicles/carriers/carriersList'
import { handleCleanForm } from '../../redux/actions/normalForm'
import { cleanError } from '../../redux/actions/formValidator'


export const CarrierScreenList = ({ titulo }) => {

    const dispatch = useDispatch()
    const { registros: data } = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Carriers'))
        dispatch(cleanError())
    }, [])

    return (
        <CustomDataTable title={titulo} columns={carriersList} data={data} />
    )
}
