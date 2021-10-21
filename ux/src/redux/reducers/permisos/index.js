import { formTypes } from "../../types/permisos/types"

// ** Initial State
const initialState = {
    Customers: { read: true, insert: true, update: true, delete: true },
    Vendors: { read: true, insert: true, update: true, delete: true },
    Carriers: { read: true, insert: true, update: true, delete: true },
    Vehicles: { read: true, insert: true, update: true, delete: true },
    Trailers: { read: true, insert: true, update: true, delete: true },
    Pools: { read: true, insert: true, update: true, delete: true },
    Items: { read: true, insert: true, update: true, delete: true },
    Family: { read: true, insert: true, update: true, delete: true },
    Purchases: { read: true, insert: true, update: true, delete: true, actions: true },
    Orders: { read: true, insert: true, update: true, delete: true, actions: true },
    Delivery: { read: true, insert: true, update: true, delete: true, actions: true },
    Production: { read: true, insert: true, update: true, delete: true, actions: true },
    Calendar: { read: true, insert: true, update: true, delete: true },
    Users: { read: true, insert: true, update: true, delete: true },
    Roles: { read: true, insert: true, update: true, delete: true },
    PaymentMethods: { read: true, insert: true, update: true, delete: true },
    Departments: { read: true, insert: true, update: true, delete: true },
    AddressesTypes: { read: true, insert: true, update: true, delete: true },
    Taxes: { read: true, insert: true, update: true, delete: true },
    CustomerType: { read: true, insert: true, update: true, delete: true },
    CustomerCategory: { read: true, insert: true, update: true, delete: true },
    Activities: { read: true, insert: true, update: true, delete: true },
    Origins: { read: true, insert: true, update: true, delete: true },
    VendorType: { read: true, insert: true, update: true, delete: true },
    Brand: { read: true, insert: true, update: true, delete: true },
    Model: { read: true, insert: true, update: true, delete: true },
    Place: { read: true, insert: true, update: true, delete: true },
    Colors: { read: true, insert: true, update: true, delete: true }
}

const permisosReducer = (state = initialState, action) => {
    switch (action.type) {
        case formTypes.SwitchPermission:
            return {
                ...state,
                [action.payload.key]: {
                    ...state[action.payload.key],
                    [action.payload.permiso]: action.payload.value
                }
            }
        case formTypes.SwitchPermissionAll:
            const newPermision = Object.entries(state[action.payload.key]).map((el) => {
                console.log(el[0])
                return { id: [el[0]], value: action.payload.value }
            })

            const newP = newPermision.reduce(
                (obj, item) => Object.assign(obj, { [item.id]: item.value }), {})

            return {
                ...state,
                [action.payload.key]: {
                    ...newP
                }
            }
        case formTypes.FillPermision:
            return {
                ...action.payload
            }
        case formTypes.CleanPermisions:
            return { ...initialState }
        default:
            return state
    }
}

export default permisosReducer
