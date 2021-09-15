import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { startLoadingTable } from '@redux/actions/custom'
import { handleCleanForm } from '@redux/actions/normalForm'
import { ProductionsList } from '@fixed/productions/ProductionsList'

import '@styles/react/libs/tables/react-dataTable-component.scss'
import { CustomMiniTable } from '../../components/datatable/CustomMiniTable'


export const ProductionScreenList = ({ titulo }) => {
    const dispatch = useDispatch()
    const { registros: data } = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Productions'))
    }, [])
    return (
        <CustomMiniTable title={titulo} columns={ProductionsList} data={data} />
    )
}
