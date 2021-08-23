import { getFormData } from "../../../utility/helpers/Axios/getFormData"
import { formTypes } from "../../types/formTypes"

export const handleRepeaterFormChange = (idGroup, id, camp, value) => ({
  type: formTypes.formRepeaterChange,
  payload: {
    data: { idGroup, id, camp, value }
  }
})

export const handleBaseFormChange = (camp, value) => ({
  type: formTypes.formBaseChange,
  payload: {
    camp,
    value
  }
})

export const handleEditData = (data) => ({
  type: formTypes.formLoadData,
  payload: data
})

export const handleRepeaterSortId = (idGroup) => ({
  type: formTypes.formRepeaterSortId,
  payload: {
    idGroup
  }
})

export const handleStartEditing = (endpoint, id) => {
  return async (dispatch) => {
    const data = await getFormData(endpoint, id)
    dispatch(handleEditData(data))
    dispatch(handleRepeaterSortId('addresses'))
    dispatch(handleRepeaterSortId('contactPersons'))
  }
}

export const repeaterFormAdd = (idGroup, id) => ({
  type: formTypes.formRepeaterAdd,
  payload: {
    idGroup,
    id
  }
})

export const handleRepeaterFormAdd = (idGroup, id) => {
  return async (dispatch) => {
    dispatch(repeaterFormAdd(idGroup, id))
    dispatch(handleRepeaterSortId(idGroup))
  }
}

export const repeaterFormDelete = (idGroup, id) => ({
  type: formTypes.formRepeaterDelete,
  payload: {
    idGroup,
    id
  }
})

export const cleanUpRow = (idGroup, id) => ({
  type: formTypes.formCleanUpRow,
  payload: {
    idGroup,
    id
  }
})

export const handleRepeaterFormDelete = (idGroup, id) => {
  return async (dispatch) => {
    await dispatch(cleanUpRow(idGroup, id))
    dispatch(repeaterFormDelete(idGroup, id))
    dispatch(handleRepeaterSortId(idGroup))
    
  }
}

export const handleCleaningUp = () => ({
  type: formTypes.formCleaningUp
})