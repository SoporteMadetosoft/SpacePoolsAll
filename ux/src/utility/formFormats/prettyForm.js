import { exceptionController } from "../helpers/undefinedExceptionController"

const format = (form, structure) => {
  return Object.entries(form).map(([keys, value]) => {
    if (!(keys in structure)) {
      if (typeof value === 'object') {
        value = exceptionController(value)
      }
    } else {
      format(form[keys], structure[keys])
    }
    return {
      [keys]: value
    }
  })
}

export const PrettyForm = (form, structure) => {
  const newObject = format(form, structure)

  return Object.assign({}, ...newObject)
}

