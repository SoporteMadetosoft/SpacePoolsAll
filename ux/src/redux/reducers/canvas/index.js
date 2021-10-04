import { canvasTypes } from "../../types/canvas/types"

const A = require(`@src/assets/images/custom/canvas/A.png`).default
const B = require(`@src/assets/images/custom/canvas/B.png`).default
const C = require(`@src/assets/images/custom/canvas/C.png`).default
const D = require(`@src/assets/images/custom/canvas/D.png`).default

const wWidth = window.innerWidth
const wHeight = window.innerHeight
const initialState2 = {
    elements:
    [
        {id:null, idElemento: 1, name: 'Skimmer 1', x: (wWidth / 15), y: ((wHeight / 12) * 1), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/A.b56ce9d9.png" },
        {id:null, idElemento: 1, name: 'Skimmer 2', x: (wWidth / 15), y: ((wHeight / 12) * 1), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/A.b56ce9d9.png" },
        {id:null, idElemento: 1, name: 'Skimmer 2', x: (wWidth / 15), y: ((wHeight / 12) * 1), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/A.b56ce9d9.png" },
        {id:null, idElemento: 1, name: 'Skimmer 2', x: (wWidth / 15), y: ((wHeight / 12) * 1), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/A.b56ce9d9.png" },
        {id:null, idElemento: 1, name: 'Skimmer 2', x: (wWidth / 15), y: ((wHeight / 12) * 1), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/A.b56ce9d9.png" },
        {id:null, idElemento: 1, name: 'Skimmer 2', x: (wWidth / 15), y: ((wHeight / 12) * 1), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/A.b56ce9d9.png" },
        {id:null, idElemento: 2, name: 'Luz 1', x: (wWidth / 15), y: ((wHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 2, name: 'Luz 1', x: (wWidth / 15), y: ((wHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 2, name: 'Luz 1', x: (wWidth / 15), y: ((wHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 2, name: 'Luz 1', x: (wWidth / 15), y: ((wHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 2, name: 'Luz 1', x: (wWidth / 15), y: ((wHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 2, name: 'Luz 1', x: (wWidth / 15), y: ((wHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 2, name: 'Luz 2', x: (wWidth / 15), y: ((wHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 2, name: 'Luz 2', x: (wWidth / 15), y: ((wHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 2, name: 'Luz 2', x: (wWidth / 15), y: ((wHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 2, name: 'Luz 2', x: (wWidth / 15), y: ((wHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 2, name: 'Luz 2', x: (wWidth / 15), y: ((wHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 2, name: 'Luz 2', x: (wWidth / 15), y: ((wHeight / 12) * 2), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 3, name: 'NCC', x: (wWidth / 15), y: ((wHeight / 12) * 3), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 3, name: 'NCC', x: (wWidth / 15), y: ((wHeight / 12) * 3), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 3, name: 'NCC', x: (wWidth / 15), y: ((wHeight / 12) * 3), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 3, name: 'NCC', x: (wWidth / 15), y: ((wHeight / 12) * 3), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 3, name: 'NCC', x: (wWidth / 15), y: ((wHeight / 12) * 3), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 3, name: 'NCC', x: (wWidth / 15), y: ((wHeight / 12) * 3), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 4, name: 'Balneo 1', x: (wWidth / 15), y: ((wHeight / 12) * 4), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 4, name: 'Balneo 1', x: (wWidth / 15), y: ((wHeight / 12) * 4), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 4, name: 'Balneo 1', x: (wWidth / 15), y: ((wHeight / 12) * 4), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 4, name: 'Balneo 1', x: (wWidth / 15), y: ((wHeight / 12) * 4), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 4, name: 'Balneo 1', x: (wWidth / 15), y: ((wHeight / 12) * 4), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" },
        {id:null, idElemento: 4, name: 'Balneo 1', x: (wWidth / 15), y: ((wHeight / 12) * 4), width: 50, height: 50, isDragging: false, imgUrl: "/static/media/D.6c8a846f.png" }
    ]
}

const initialState = { ...initialState2}

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
                y: obj.y
            }

           // console.log({
           //     ...newState,
           //     [key]: [...newState[key]]
           // })
            return {
                ...newState,
                [key]: [...newState[key]]
            }
        case canvasTypes.SaveCanvas:
            console.log('SaveCanvas')
            return {...initialState2}

        case canvasTypes.CleanCanvas:
            console.log('CleanCanvas')
            return {...initialState2}

            
        case canvasTypes.DeleteCanvasElement:
            console.log('DeleteCanvasElement')
            delete state[action.payload.key][action.payload.position]
            return {
                ...state
            }
        case canvasTypes.setAllCanvas:
            const data =  action.payload.data
            return {
                ...state,
                    elements : [...data]
                
            }
        default:
            return state
    }
}

export default canvasReducer