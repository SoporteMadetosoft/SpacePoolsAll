import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import { TaxesList } from '../../../../fixed/setup/general/taxes/TaxesList'
import { handleCleanForm } from '../../../../redux/actions/normalForm'


export const TaxesListScreen = ({ titulo }) => {

    const dispatch = useDispatch()
    const { registros: data } = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Taxes'))
    }, [])

    return (
        <CustomDataTable title={titulo} columns={TaxesList} data={data} />
    )
}
