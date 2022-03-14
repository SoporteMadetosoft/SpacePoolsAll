import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CustomDataTable } from '@components/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { handleFullClean } from '@helpers/handleFullClean.js'

import '@styles/react/libs/tables/react-dataTable-component.scss'

export const ListScreen = (props) => {

    const dispatch = useDispatch()
    const { registros: data } = useSelector(state => state.registrosReducer)

    const { title, endPoint, list } = props

    useEffect(() => {
        handleFullClean(dispatch)
        dispatch(startLoadingTable(endPoint))
    }, [])

    return <CustomDataTable title={title} data={data} {...list} />
}
