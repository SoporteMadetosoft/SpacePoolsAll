import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import { departmentsList } from '@fixed/setup/general/departments/departmentsList'
import { handleCleanForm } from '../../../../redux/actions/normalForm'

import '@styles/react/libs/tables/react-dataTable-component.scss'

export const DepartmentsScreenList = ({titulo}) => {

    const dispatch = useDispatch()
    const {registros:data} = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Departments'))   
    }, [])

    return (
        <CustomDataTable title={titulo} columns={departmentsList} data={data} />
    )
}
