import { canvasTypes } from "../../types/canvas/types"

const A = require(`@src/assets/images/custom/canvas/A.png`).default
const B = require(`@src/assets/images/custom/canvas/B.png`).default
const C = require(`@src/assets/images/custom/canvas/C.png`).default
const D = require(`@src/assets/images/custom/canvas/D.png`).default


const initialState = {
    elements:
        [
            { id: 0, name: 'Skimmer 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 1), width: 50, height: 50, isDragging: false, imgUrl: A },
            { id: 1, name: 'Skimmer 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 1), width: 50, height: 50, isDragging: false, imgUrl: A },
            { id: 2, name: 'Skimmer 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 1), width: 50, height: 50, isDragging: false, imgUrl: A },
            { id: 3, name: 'Skimmer 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 1), width: 50, height: 50, isDragging: false, imgUrl: A },
            { id: 4, name: 'Skimmer 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 1), width: 50, height: 50, isDragging: false, imgUrl: A },
            { id: 5, name: 'Skimmer 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 1), width: 50, height: 50, isDragging: false, imgUrl: A },
            { id: 6, name: 'Luz 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: B },
            { id: 7, name: 'Luz 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: B },
            { id: 8, name: 'Luz 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: B },
            { id: 9, name: 'Luz 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: B },
            { id: 10, name: 'Luz 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: B },
            { id: 11, name: 'Luz 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: B },
            { id: 12, name: 'Luz 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: B },
            { id: 13, name: 'Luz 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: B },
            { id: 14, name: 'Luz 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: B },
            { id: 15, name: 'Luz 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: B },
            { id: 16, name: 'Luz 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: B },
            { id: 17, name: 'Luz 2', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: B },
            { id: 18, name: 'NCC', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 3), width: 50, height: 50, isDragging: false, imgUrl: C },
            { id: 19, name: 'NCC', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 3), width: 50, height: 50, isDragging: false, imgUrl: C },
            { id: 20, name: 'NCC', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 3), width: 50, height: 50, isDragging: false, imgUrl: C },
            { id: 21, name: 'NCC', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 3), width: 50, height: 50, isDragging: false, imgUrl: C },
            { id: 22, name: 'NCC', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 3), width: 50, height: 50, isDragging: false, imgUrl: C },
            { id: 23, name: 'NCC', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 3), width: 50, height: 50, isDragging: false, imgUrl: C },
            { id: 24, name: 'Balneo 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 4), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: 25, name: 'Balneo 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 4), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: 26, name: 'Balneo 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 4), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: 27, name: 'Balneo 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 4), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: 28, name: 'Balneo 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 4), width: 50, height: 50, isDragging: false, imgUrl: D },
            { id: 29, name: 'Balneo 1', x: (window.innerWidth / 15), y: ((window.innerHeight / 12) * 4), width: 50, height: 50, isDragging: false, imgUrl: D }
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
        default:
            return state
    }
}

export default canvasReducer