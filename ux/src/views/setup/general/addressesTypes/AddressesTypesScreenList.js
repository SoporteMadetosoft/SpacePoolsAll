import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { AddressesTypesList } from '@fixed/setup/general/addressesTypes/addressesTypesList'
import { handleCleanForm } from '../../../../redux/actions/normalForm'

import '@styles/react/libs/tables/react-dataTable-component.scss'
import { cleanFormValidator } from '../../../../redux/actions/formValidator'

export const AddressesTypesScreenList = ({titulo}) => {

    const dispatch = useDispatch()
    const {registros:data} = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('AddressesTypes'))  
        dispatch(cleanFormValidator()) 
    }, [])

    return (
        <CustomDataTable title={titulo} columns={AddressesTypesList} data={data} />
    )
}
