import { exceptionController } from "../helpers/undefinedExceptionController"

const format = (form, structure) => {
  return Object.entries(form).map(([keys, value]) => {
    if (!(keys in structure)) {
      if (typeof value === 'object') {
        value = exceptionController(value)
      }
    } else {
      form[keys] = form[keys].map((el) => {
        const element = format(el, structure[keys])
        return Object.assign({}, ...element)
      })
      return form
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

