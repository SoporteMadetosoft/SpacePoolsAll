import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import { itemsFamilyList } from '../../fixed/items/itemsFamily/itemsFamilyList'
import { handleCleanForm } from '../../redux/actions/normalForm'
import { cleanFormValidator } from '../../redux/actions/formValidator'


export const ItemsFamilyScreenList = ({ titulo }) => {

    const dispatch = useDispatch()
    const { registros: data } = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Family'))
        dispatch(cleanFormValidator())
    }, [])

    return (
        <CustomDataTable title={titulo} columns={itemsFamilyList} data={data} />
    )
}
