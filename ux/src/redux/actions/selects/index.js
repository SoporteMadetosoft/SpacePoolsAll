import axios from "axios"
import { endPoints } from "@fixed/endPoints"

import { selectTypes } from "../../types/selects/types"

export const addSelectOptions = (key, options) => ({
    type: selectTypes.addSelectOptions,
    payload: { key, options }
})

export const startAddSelectOptions = (endPoint, key, labelName = 'name') => {
    return async (dispatch) => {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/select`)
        dispatch(addSelectOptions(key, data.map(option => ({ label: option[labelName], value: option.id }))))
    }
}

export const cleanSelectOptions = () => ({
    type: selectTypes.cleanSelectOptions
})
