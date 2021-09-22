import { canvasTypes } from "../../types/canvas/types"

const A = require(`@src/assets/images/custom/canvas/A.png`).default
const B = require(`@src/assets/images/custom/canvas/B.png`).default
const C = require(`@src/assets/images/custom/canvas/C.png`).default
const D = require(`@src/assets/images/custom/canvas/D.png`).default


const initialState = {
    elements:
        [
            { id: null, idElement:1 ,name: 'Skimmer 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 1), width: 50, height: 50, isDragging: false, imgUrl: A },
            { id: null, idElement:1 ,name: 'Skimmer 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 1), width: 50, height: 50, isDragging: false, imgUrl: A },
            { id: null, idElement:1 ,name: 'Skimmer 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 1), width: 50, height: 50, isDragging: false, imgUrl: A },
            { id: null, idElement:1 ,name: 'Skimmer 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 1), width: 50, height: 50, isDragging: false, imgUrl: A },
            { id: null, idElement:1 ,name: 'Skimmer 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 1), width: 50, height: 50, isDragging: false, imgUrl: A },
            { id: null, idElement:1 ,name: 'Skimmer 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 1), width: 50, height: 50, isDragging: false, imgUrl: A },
            { id: null, idElement:1 ,name: 'Luz 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: A },
            { id: null, idElement:1 ,name: 'Luz 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: A },
            { id: null, idElement:1 ,name: 'Luz 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: A },
            { id: null, idElement:1 ,name: 'Luz 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: A },
            { id: null, idElement:2, name: 'Luz 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: null, idElement:2, name: 'Luz 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: null, idElement:2, name: 'Luz 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: null, idElement:2, name: 'Luz 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: null, idElement:2, name: 'Luz 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: null, idElement:2, name: 'Luz 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: null, idElement:2, name: 'Luz 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: null, idElement:2, name: 'Luz 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: null, idElement:2, name: 'NCC', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 3), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: null, idElement:2, name: 'NCC', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 3), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: null, idElement:2, name: 'NCC', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 3), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: null, idElement:2, name: 'NCC', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 3), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: null, idElement:2, name: 'NCC', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 3), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: null, idElement:2, name: 'NCC', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 3), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: null, idElement:2, name: 'Balneo 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 4), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: null, idElement:2, name: 'Balneo 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 4), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: null, idElement:2, name: 'Balneo 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 4), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: null, idElement:2, name: 'Balneo 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 4), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: null, idElement:2, name: 'Balneo 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 4), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: null, idElement:2, name: 'Balneo 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 4), width: 50, height: 50, isDragging: false, imgUrl: D }
        ]
}

const canvasReducer = (state = initialState, action) => {
    switch (action.type) {
        case canvasTypes.LoadElement:
            return {
                ...state,
                [action.payload.key]: [
                    ...state[action.payload.key],
                    { ...action.payload.structure }
                ]
            }
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