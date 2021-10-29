import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import { itemList } from '../../fixed/items/itemList'
import { handleCleanForm } from '../../redux/actions/normalForm'
import { cleanFormValidator } from '../../redux/actions/formValidator'

export const ItemScreenList = ({ titulo }) => {

    const dispatch = useDispatch()
    const { registros: data } = useSelector(state => state.registrosReducer)


    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Items'))
        dispatch(cleanFormValidator())
        //dispatch(startAddSelectStatus('Vendors','Vendors','comercialName'))
    }, [])

    return (
        <CustomDataTable title={titulo} columns={itemList} data={data} />
    )
}
