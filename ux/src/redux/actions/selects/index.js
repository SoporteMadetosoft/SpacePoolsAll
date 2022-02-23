import axios from "axios"
import { endPoints } from "@fixed/endPoints"

import { selectTypes } from "../../types/selects/types"

const token = localStorage.getItem('accessToken') || ''

export const addSelectOptions = (key, options) => ({
    type: selectTypes.addSelectOptions,
    payload: { key, options }
})

export const startAddSelectOptions = (endPoint, key, labelName = 'name') => {

    return async (dispatch) => {
        const { data } = await axios.get(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}`, {
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            }
        })

        dispatch(addSelectOptions(key, data.map(option => ({ label: option[labelName], value: option.id }))))
    }
}
export const startAddSelectStatus = (endPoint, key, labelName = 'name') => {
    return async (dispatch) => {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/select`, {
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            }
        })
        dispatch(addSelectOptions(key, data.map(option => ({ label: option[labelName], value: option.id }))))
    }
}

export const startAddSelectPoolItems = (endPoint, key, labelName = 'name', itemType) => {
    const nObj = {
        idVendor: null,
        itemType
    }

    return async (dispatch) => {
        const token = localStorage.getItem('accessToken')
        const { data: { data } } = await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/listItems`, { nObj }, {
            headers: {
                'Content-type': 'application/json',
                'x-token': token,
                itemType
            }
        })
        dispatch(addSelectOptions(key, data.map(option => ({ label: option[labelName], value: option.id }))))
    }
}

export const startAddSelectOptionTree = (endPoint, key, idNode) => {
    return async (dispatch) => {
        const { data: { data } } = await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/select`, { idNode }, {
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            }
        })
        dispatch(addSelectOptions(key, data.map(option => ({ ...option }))))
    }
}


export const cleanSelectOptions = () => ({
    type: selectTypes.cleanSelectOptions
})
