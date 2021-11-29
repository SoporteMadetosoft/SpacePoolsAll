import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { startLoadingTableProduction } from '@redux/actions/custom'
import { handleCleanForm } from '@redux/actions/normalForm'
import { ProductionsList } from '@fixed/productions/ProductionsList'

import '@styles/react/libs/tables/react-dataTable-component.scss'
import { CustomMiniTable } from '../../components/datatable/CustomMiniTable'
import { cleanFormValidator } from '../../redux/actions/formValidator'


export const ProductionScreenList = () => {
    const dispatch = useDispatch()
    const { registros: data } = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())

        dispatch(startLoadingTableProduction('Productions'))
        dispatch(cleanFormValidator())

    }, [])
    return (
        <>
            <CustomMiniTable columns={ProductionsList} data={data} />
        </>
    )
}
