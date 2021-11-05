import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CustomDataTable } from '@cc/datatable/CustomDataTable'
import { startLoadingTable } from '@redux/actions/custom'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import { cleanFormValidator } from "../../../redux/actions/formValidator"
import { handleCleanForm } from "../../../redux/actions/normalForm"
import { itemsColorsList } from "../../../fixed/items/itemsColors/itemsColorsList"





export const ItemsColorScreenList = ({ titulo }) => {

    const dispatch = useDispatch()
    const { registros: data } = useSelector(state => state.registrosReducer)

    useEffect(() => {
        dispatch(handleCleanForm())
        dispatch(startLoadingTable('ItemColors'))
        dispatch(cleanFormValidator())
    }, [])

    return (
        <CustomDataTable title={titulo} columns={itemsColorsList} data={data} />
    )
}