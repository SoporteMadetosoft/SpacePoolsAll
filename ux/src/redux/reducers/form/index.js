import { formTypes } from "../../types/formTypes"

// **  Initial State
const initialState = {
    formData:{
        base: {},
        addresses:[],
        contactPersons:[]
    }
}

let newObject
let newGroup
  
const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case formTypes.setData:
            return {
                ...state
            }

        case formTypes.baseFormChange:
            return {
                ...state
            }

        case formTypes.formRepeaterChange:
    
            const { idGroup, id, camp, value } = action.payload.data
            newObject = state.formData[idGroup].find(reg => reg._id === id)
            
            newObject
            ? newObject = { ...newObject, [camp] : value}
            : newObject = { _id: id, [camp] : value }
           
            newGroup = [
                ...state.formData[idGroup].filter(reg => {
                    return reg._id !== id
                }),
                newObject
            ]
         
            return {
                ...state,
                formData:{
                    ...state.formData,
                    [idGroup] : newGroup.sort((item1, item2) => (item1._id - item2._id))
                }  
            }
        case formTypes.formRepeaterAdd:

            return {
                ...state,
                formData:{
                    ...state.formData,
                    [action.payload.idGroup] : [ 
                        ...state.formData[action.payload.idGroup],
                        {_id : action.payload.id}
                     ]
                }
            }
        case formTypes.formRepeaterDelete:

            return {
                ...state,
                formData:{
                    ...state.formData,
                    [action.payload.idGroup] : [ ...state.formData[action.payload.idGroup].filter(reg => reg._id !== action.payload.id) ]
                }
            }

        case formTypes.formBaseChange:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    base:{
                        ...state.formData.base,
                        [action.payload.camp]: action.payload.value
                    }
                }
            }

        case formTypes.formLoadData:
            return {
                ...state,
                formData: action.payload
            }
        case formTypes.formRepeaterSortId:
            const objArray = []
            state.formData[action.payload.idGroup].map((element, index) => {
                const obj = {
                    ...element,
                    _id: index
                }
                objArray.push(obj)
            })
            return {
                ...state,
                formData: {
                     ...state.formData,
                     [action.payload.idGroup]: objArray
                }
            }

        case formTypes.formCleaningUp:
            return initialState
        case formTypes.formCleanUpRow:

            newObject = { _id: action.payload.id }
            
            newGroup = [
                ...state.formData[action.payload.idGroup].filter(reg => {
                    return reg._id !== action.payload.id
                }),
                newObject
            ]

            return {
                ...state,
                formData: {
                     ...state.formData,
                     [action.payload.idGroup] : newGroup.sort((item1, item2) => (item1._id - item2._id))
                }
            }
        default:
            return state
    }
}

export default formReducer
  