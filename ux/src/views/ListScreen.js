import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomDataTable } from '@components/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { handleFullClean } from '@helpers/handleFullClean.js'

export const ListScreen = ({ title, endPoint, list }) => {
    const dispatch = useDispatch()
    const { registros: data } = useSelector(state => state.registrosReducer)

    useEffect(() => {
        handleFullClean(dispatch)
        dispatch(startLoadingTable(endPoint))
    }, [])

    return <CustomDataTable title={title} data={data} {...list} />
}
