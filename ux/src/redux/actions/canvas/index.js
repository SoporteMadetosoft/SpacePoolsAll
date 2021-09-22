import { canvasTypes } from "../../types/canvas/types"
import { editRepeaterRegister, handleCleanSection } from "../normalForm"
import { getFormData } from "../../../utility/helpers/Axios/getFormData"
import canvasReducer from "../../reducers/canvas"

export const addCanvasElement = (key, structure) => ({
    type: canvasTypes.LoadElement,
    payload: { key, structure }
})

export const editDropedElement = (key, position, obj) => ({
    type: canvasTypes.DropElement,
    payload: { key, position, obj }
})

export const handleCleanCanvas = () => ({
    type: canvasTypes.CleanCanvas
})

export const handleDeleteCanvasElement = (key, position) => ({
    type: canvasTypes.DeleteCanvasElement,
    payload: { key, position }
})

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


export const setNewCanvasPosition = () => {
    return (dispatch, getState) => {
        const canvasitems = getState().normalForm.canvasItems
        if (canvasitems) {
            if (canvasitems[0]) {
                const items = []
                let num = 0

                canvasitems.forEach(element => {
                    items[num] = element
                    num++
                })

                dispatch(handleCleanSection("canvasItems"))
                dispatch(handleCleanCanvas())

                items.forEach(element => {
                    const structure = {
                        idOrder: element.idOrder,
                        id: element.id,
                        idElemento : element.idElemento,
                        name: element.name,
                        width: element.width,
                        height: element.height,
                        isDragging: false,
                        imgUrl: element.imgUrl,
                        x: element.x,
                        y: element.y
                    }
                    dispatch(addCanvasElement("elements", structure))
                })


                console.log(items)
            }
        }

    }
}

export const prepareCanvasItemForm = (endpoint, position, arr) => {
    return async (dispatch, getState) => {

        //  const allItems = getState().normalForm[arr]
        let idcanvasItem = 0
        //if (allItems.length !== 1) {
        //    idcanvasItem = allItems[allItems.length - 2].idCanvasItem
        //    console.log(idcanvasItem)
        //    idcanvasItem++
        //}

        const allCanvasItems = getState().canvasReducer.elements
        if (allCanvasItems.length !== 1) {
            idcanvasItem = allCanvasItems[allCanvasItems.length - 1].idCanvasItem
            if (idcanvasItem === null || idcanvasItem === undefined) {
                idcanvasItem = 0
            }
            idcanvasItem++
        }
 


        dispatch(deleteCanvasElement(position))

        const obj = {
            name: "idCanvasItem",
            value: idcanvasItem
        }
        dispatch(editRepeaterRegister(arr, position, obj))


        const { idItem } = getState().normalForm[arr][position]
        const item = await getFormData(endpoint, idItem.id)

        const itemCanvasStructure = {
            idCanvasItem: idcanvasItem,
            id: item.id,
            name: item.name,
            width: 50,
            height: 50,
            isDragging: false,
            imgUrl: item.imgUrl
        }
        dispatch(addCanvasElement("elements", itemCanvasStructure))

    }
}