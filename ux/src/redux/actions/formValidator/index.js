import { formValidatorTypes } from '../../types/formValidator'

export const setSchema = (schema) => ({
    type: formValidatorTypes.setSchema,
    payload: schema
})

export const removeSchema = (schema) => ({
    type: formValidatorTypes.removeSchema
})

export const setErrors = (errors) => ({
    type: formValidatorTypes.setErrors,
    payload: errors
})
export const removeError = (errors) => ({
    type: formValidatorTypes.removeError,
    payload: errors
})
export const cleanError = (errors) => ({
    type: formValidatorTypes.removeError
})
