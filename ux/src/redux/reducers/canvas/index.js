import { canvasTypes } from "../../types/canvas/types"

const A = require(`@src/assets/images/custom/canvas/A.png`).default
const B = require(`@src/assets/images/custom/canvas/B.png`).default
const C = require(`@src/assets/images/custom/canvas/C.png`).default
const D = require(`@src/assets/images/custom/canvas/D.png`).default


const initialState = {
    elements:
        []
}

const canvasReducer = (state = initialState, action) => {
    switch (action.type) {
        case canvasTypes.LoadElement:

            const key1 = action.payload.key
            const position1 = action.payload.position
            const structure1 = action.payload.structure
            
            state[key1][position1] = {
                ...state[key1][position1],
                idOrder: structure1.idOrder,
                id: structure1.id,
                idElemento: structure1.idElemento,
                name: structure1.name,
                imgUrl: structure1.imgUrl,
                x: structure1.x,
                y: structure1.y,
                pos: position1
            }

            return {
                ...state,
                [key1]: [...state[key1]]
            }

          // return {
          //     ...state,
          //     [action.payload.key]: [
          //         ...state[action.payload.key],
          //         { ...action.payload.structure }
          //     ]
          // }
        case canvasTypes.DropElement:
            const { key, position, obj } = action.payload
            state[key][position] = {
                ...state[key][position],
                x: obj.x,
                y: obj.y,
                imgUrl: obj.imgUrl
            }
            return {
                ...state,
                [key]: [...state[key]]
            }
        case canvasTypes.SaveCanvas:
            return { initialState }

        case canvasTypes.CleanCanvas:
            return {
                ...state,
                elements: []
            }
        case canvasTypes.DeleteCanvasElement:
            delete state[action.payload.key][action.payload.position]
            return {
                ...state
            }
        default:
            return state
    }
}

export default canvasReducer