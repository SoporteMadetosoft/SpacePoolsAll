import { exceptionController } from "./undefinedExceptionController"

export const undoMultiSelect = (data, key) => {
    data = data.map((element) => {
        return {[key]: exceptionController(element)}
    })

    return data
}