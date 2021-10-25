import { canvasTypes } from "../../types/canvas/types"
import { endPoints } from "@fixed/endPoints"
import axios from "axios"

export const addCanvasElement = (key, structure, position) => ({
    type: canvasTypes.LoadElement,
    payload: { key, structure, position }
})

export const editDropedElement = (key, position, obj) => {
    return async (dispatch, getState) => {
        if (obj.x > 300) {
            dispatch({
                type: canvasTypes.DropElement,
                payload: { key, position, obj }
            })
        }
    }
}

export const cloneCanvasElement = (key, position) => {
    return async (dispatch, getState) => {
        dispatch({
            type: canvasTypes.CloneElement,
            payload: { key, position }
        })
    }
}

export const handleCleanCanvas = () => ({
    type: canvasTypes.CleanCanvas
})

export const handleDeleteCanvasElement = (key, position) => ({
    type: canvasTypes.DeleteCanvasElement,
    payload: { key, position }
})

export const handleSetAllCanvas = (data) => ({
    type: canvasTypes.setAllCanvas,
    payload: { data }
})

export const getCItemsByOrderId = (endPoint, id) => {
    return async (dispatch, getState) => {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/canvas/list/${id}`)

        const newItemsList = []
        data.forEach((element, index) => {
            const imageUrl = getState().canvasReducer.elements[element.idElemento - 1].imgUrl
            const newItem = {
                ...element,
                imgUrl: imageUrl
            }

            newItemsList[index] = newItem
        })
        dispatch(handleSetAllCanvas(newItemsList))
    }
}

export const deleteCanvasElement = (position) => {
    return (dispatch, getState) => {
        const canvasitem = getState().normalForm.extraItems[position].idCanvasItem

        const canvasItems = getState().canvasReducer.elements
        let numPos = 0

        canvasItems.forEach(element => {
            if (element !== null && element !== undefined) {
                if (element.idCanvasItem === canvasitem) {
                    dispatch(handleDeleteCanvasElement("elements", numPos))
                }
            }

            numPos++
        })
    }
}

export const setInitialCanvas = () => {
    return (dispatch, getState) => {
        const canvasitems = getState().canvasReducer.elements
        dispatch(handleCleanCanvas())

        canvasitems.forEach((element, index) => {

            const newItem = {
                idElemento: element.idElemento,
                pos: element.pos,
                imgUrl: element.imgUrl,
                name: element.name,
                isDragging: element.isDragging,
                id: null,
                x: (window.innerWidth) / 15,
                y: ((window.innerHeight) / 12) * element.idElemento
            }
            dispatch(addCanvasElement("elements", newItem, index))
        })
        //dispatch(handleCleanCanvas())
    }
}