import { canvasTypes } from "../../types/canvas/types"

const BALNEO = require(`@src/assets/images/custom/canvas/BALNEO.png`).default
const LUZ = require(`@src/assets/images/custom/canvas/LUZ.png`).default
const NCC = require(`@src/assets/images/custom/canvas/NCC.png`).default
const NICHO = require(`@src/assets/images/custom/canvas/NICHO.png`).default
const SK = require(`@src/assets/images/custom/canvas/SK.png`).default
const TOMA = require(`@src/assets/images/custom/canvas/TOMA.png`).default

const wWidth = window.innerWidth
const wHeight = window.innerHeight

const initialState2 = {
    elements:
        [
            { id: null, idElemento: 1, name: 'Balneo', x: (wWidth / 15), y: ((wHeight / 12) * 1), width: 50, height: 50, isDragging: false, rotation: 0, imgUrl: BALNEO },
            { id: null, idElemento: 2, name: 'Luz', x: (wWidth / 15), y: ((wHeight / 12) * 2), width: 50, height: 50, isDragging: false, rotation: 0, imgUrl: LUZ },
            { id: null, idElemento: 3, name: 'NCC', x: (wWidth / 15), y: ((wHeight / 12) * 3), width: 50, height: 50, isDragging: false, rotation: 0, imgUrl: NCC },
            { id: null, idElemento: 4, name: 'Nicho', x: (wWidth / 15), y: ((wHeight / 12) * 4), width: 50, height: 50, isDragging: false, rotation: 0, imgUrl: NICHO },
            { id: null, idElemento: 5, name: 'Skimmer', x: (wWidth / 15), y: ((wHeight / 12) * 5), width: 50, height: 50, isDragging: false, rotation: 0, imgUrl: SK },
            { id: null, idElemento: 6, name: 'Toma', x: (wWidth / 15), y: ((wHeight / 12) * 6), width: 50, height: 50, isDragging: false, rotation: 0, imgUrl: TOMA }
        ]
}

const initialState = { ...initialState2 }

const canvasReducer = (state = { ...initialState }, action) => {
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
        case canvasTypes.DropElement:
            const { key, position, obj } = action.payload

            const newState = { ...state }

            newState[key][position] = {
                ...newState[key][position],
                x: obj.x,
                y: obj.y,
                rotation: obj.rotation
            }

            return {
                ...newState,
                [key]: [...newState[key]]
            }
        case canvasTypes.CloneElement:

            const ClonedElement = {
                ...state[action.payload.key][action.payload.position],
                x: state[action.payload.key][action.payload.position]['x'] + 50,
                y: state[action.payload.key][action.payload.position]['y'] + 50,
                pos: state[action.payload.key].length
            }

            delete ClonedElement.id

            return {
                ...state,
                [action.payload.key]: [
                    ...state[action.payload.key],
                    ClonedElement
                ]
            }
        case canvasTypes.SaveCanvas:
            return { ...initialState2 }

        case canvasTypes.CleanCanvas:
            return { ...initialState2 }


        case canvasTypes.DeleteCanvasElement:
            delete state[action.payload.key][action.payload.position]
            return {
                ...state
            }
        case canvasTypes.setAllCanvas:
            const data = action.payload.data
            return {
                ...state,
                elements: [...data]

            }
        case canvasTypes.RemoveElement:
            const newCanvas = state[action.payload.key].filter((element, index) => (index !== action.payload.position))
            return {
                ...state,
                [action.payload.key]: [...newCanvas]
            }
        default:
            return state
    }
}

export default canvasReducer