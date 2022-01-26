import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { handleCleanForm } from '@redux/actions/normalForm'
import { cleanFormValidator } from '../redux/actions/formValidator/index.js'
import '@styles/react/libs/tables/react-dataTable-component.scss'

export const ListScreen = ({ titulo, endPoint, columns }) => {

    const dispatch = useDispatch()
    const { registros: data } = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable(endPoint))
        dispatch(cleanFormValidator())
    }, [])

    return (
        <CustomDataTable title={titulo} columns={columns} data={data} />
    )
}
