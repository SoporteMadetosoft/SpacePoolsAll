import { canvasTypes } from "../../types/canvas/types"

export const addCanvasElement = (key, structure) => ({
    type: canvasTypes.LoadElement,
    payload: { key, structure }
})

export const editDropedElement = (key, position, obj) => ({
    type: canvasTypes.DropElement,
    payload: { key, position, obj }
})

export const setNewCanvasPosition = () => ({
    
})