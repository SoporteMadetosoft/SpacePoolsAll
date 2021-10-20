import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { startLoadingTable } from '@redux/actions/custom'
import { CustomDataTable } from '@cc/datatable/CustomDataTable'


import '@styles/react/libs/tables/react-dataTable-component.scss'
import { handleCleanForm } from '../../redux/actions/normalForm'
import { usersList } from '../../fixed/users/usersList'

export const UsersListScreen = ({ titulo }) => {

    const dispatch = useDispatch()
    const { registros: data } = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('Users'))
    }, [])

    return (
        <CustomDataTable title={titulo} columns={usersList} data={data} />
    )
}
