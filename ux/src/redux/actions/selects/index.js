import axios from "axios"

import { selectTypes } from "../../types/selects/types"

export const addSelectOptions = (key, options) => ({
  type: selectTypes.addSelectOptions,
  payload: { key, options }
})

export const startAddSelectOptions = (url, key) => {

    return async (dispatch) => {
        const { data } = await axios.get(`${process.env.REACT_APP_HOST_URI}${url}/select`)
        dispatch(addSelectOptions(key, data.data))
    }
    
}

export const cleanSelectOptions = () => ({
    type: selectTypes.cleanSelectOptions
})
