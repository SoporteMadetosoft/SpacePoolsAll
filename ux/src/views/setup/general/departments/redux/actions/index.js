import { getSetupSelectList } from "@helpers/Axios/getSetupSelectList"
import {types} from '../types'

export const startDepartments = (data) => ({
    type: types.loadDepartments,
    payload: {data}
})

export const startLoadingDepartments = () => {
    return async (dispatch) => {
        const data = await getSetupSelectList('Departments')    
        dispatch(startDepartments(data))
    }
}