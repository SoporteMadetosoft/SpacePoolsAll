import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { TreeSelect } from "antd"
import "antd/dist/antd.css"

import { handleChangeController } from '../../../redux/actions/normalForm'
import { startAddSelectOptionTree } from '../../../redux/actions/selects'

export const SelectArbol = ({ name, label, className, placeholder = label, endpoint }) => {

    const { id } = useParams()

    const dispatch = useDispatch()
    const normalForm = useSelector(state => state.normalForm)
    const { [endpoint]: options } = useSelector(state => state.selectReducer)
    const { parent: value } = normalForm ? normalForm : null

    const handleSelectChange = (parent) => {
        if (parseInt(id) === parent) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: '¡La familia no puede ser padre de si misma!'
            })
            dispatch(handleChangeController(name, null))
        } else {
            dispatch(handleChangeController(name, parent))
        }
    }

    useEffect(() => {
        dispatch(startAddSelectOptionTree(endpoint, endpoint, id))
    }, [])

    return (
        <>
            <label className="control-label">{label}</label>
            <TreeSelect
                className={`${className}`}
                name={name}
                value={value}
                treeData={options}
                placeholder={placeholder}
                onChange={handleSelectChange}
                style={{ width: "100%" }}
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                treeDefaultExpandAll
            />
        </>
    )
}
