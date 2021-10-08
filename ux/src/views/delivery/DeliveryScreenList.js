import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { deliveryList } from '@fixed/delivery/deliveryList'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { handleCleanForm } from '@redux/actions/normalForm'

import '@styles/react/libs/tables/react-dataTable-component.scss'

export const DeliveryScreenList = ({ titulo }) => {

    const dispatch = useDispatch()
    const { registros: data } = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Delivery'))
    }, [])
    return (
        <CustomDataTable title={titulo} columns={deliveryList} data={data} add={0} />
    )
}
