import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { handleCleaningUp } from '@redux/actions/form'
import { paymentMethodsList } from '@fixed/setup/general/paymentMethods/paymentMethodsList'

import '@styles/react/libs/tables/react-dataTable-component.scss'

export const PaymentMethodsScreenList = ({titulo}) => {

    const dispatch = useDispatch()
    const {registros:data} = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleaningUp())
        dispatch(startLoadingTable('PaymentMethods'))   
    }, [])

    return (
        <CustomDataTable title={titulo} columns={paymentMethodsList} data={data} />
    )
}
