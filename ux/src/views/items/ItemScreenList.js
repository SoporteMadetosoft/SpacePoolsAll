import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import { itemList } from '../../fixed/items/itemList'
import { handleCleanForm } from '../../redux/actions/normalForm'


export const ItemScreenList = ({ titulo }) => {

    const dispatch = useDispatch()
    const { registros: data } = useSelector(state => state.registrosReducer)
    
    console.log(data)
    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Items'))
    }, [])

    return (
        <CustomDataTable title={titulo} columns={itemList} data={data} />
    )
}
