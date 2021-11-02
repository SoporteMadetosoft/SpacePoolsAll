import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { colorsList } from '@fixed/setup/items/colors/colorsList'
import { handleCleanForm } from '../../../../redux/actions/normalForm'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { cleanFormValidator } from '../../../../redux/actions/formValidator'

export const ColorsScreenList = ({ titulo }) => {

    const dispatch = useDispatch()
    const { registros: data } = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Colors'))
        dispatch(cleanFormValidator()) 
    }, [])

    return (
        <CustomDataTable title={titulo} columns={colorsList} data={data} />
    )
}
