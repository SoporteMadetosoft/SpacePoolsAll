import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { startLoadingTable } from '@redux/actions/custom'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { rolesList } from '@fixed/roles/rolesList'

import '@styles/react/libs/tables/react-dataTable-component.scss'
import { handleCleanForm } from '../../redux/actions/normalForm'

export const RolesScreenList = ({ titulo }) => {

    const dispatch = useDispatch()
    const { registros: data } = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Roles'))
    }, [])

    return (
        <CustomDataTable title={titulo} columns={rolesList} data={data} />
    )
}
