import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { handleCleaningUp } from '@redux/actions/form'
import { AddressesTypesList } from '@fixed/setup/general/addressesTypes/addressesTypesList'

import '@styles/react/libs/tables/react-dataTable-component.scss'

export const AddressesTypesScreenList = ({titulo}) => {

    const dispatch = useDispatch()
    const {registros:data} = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleaningUp())
        dispatch(startLoadingTable('AddressesTypes'))   
    }, [])

    return (
        <CustomDataTable title={titulo} columns={AddressesTypesList} data={data} />
    )
}
