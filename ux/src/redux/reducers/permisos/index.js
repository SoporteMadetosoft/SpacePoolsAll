import { formTypes } from "../../types/permisos/types"

// ** Initial State
const initialState = {
    Mutuas: { read: true, insert: true, update: true, delete: true },
    Centers: { read: true, insert: true, update: true, delete: true },
    Doctors: { read: true, insert: true, update: true, delete: true },
    Procedures: { read: true, insert: true, update: true, delete: true },
    Materials: { read: true, insert: true, update: true, delete: true },
    InstrumentTypes: { read: true, insert: true, update: true, delete: true },
    Instrumentals: { read: true, insert: true, update: true, delete: true },
    Sheets: { read: true, insert: true, update: true, delete: true },
    Surgery: { read: true, insert: true, update: true, delete: true },
    Calendar: { read: true, insert: true, update: true, delete: true },
    Vehicles: { read: true, insert: true, update: true, delete: true },
    Routes: { read: true, insert: true, update: true, delete: true },
    Loans: { read: true, insert: true, update: true, delete: true },
    Deposits: { read: true, insert: true, update: true, delete: true },
    Sales: { read: true, insert: true, update: true, delete: true },
    Delivery: { read: true, insert: true, update: true, delete: true },
    Incidences: { read: true, insert: true, update: true, delete: true },

    Users: { read: true, insert: true, update: true, delete: true },
    Roles: { read: true, insert: true, update: true, delete: true },

    AddressType: { read: true, insert: true, update: true, delete: true },
    Department: { read: true, insert: true, update: true, delete: true },
    SalesOrg: { read: true, insert: true, update: true, delete: true },
    ConditionalOrg: { read: true, insert: true, update: true, delete: true },
    DepositOrg: { read: true, insert: true, update: true, delete: true },
    Zone: { read: true, insert: true, update: true, delete: true },
    ProcedureFamily: { read: true, insert: true, update: true, delete: true },
    Family: { read: true, insert: true, update: true, delete: true },
    IncidenceType: { read: true, insert: true, update: true, delete: true },
    IncidenceReason: { read: true, insert: true, update: true, delete: true },
    LoanType: { read: true, insert: true, update: true, delete: true },
    Brand: { read: true, insert: true, update: true, delete: true },
    Model: { read: true, insert: true, update: true, delete: true },
    Notification: { read: true, insert: true, update: true, delete: true },
    Alerts: { read: true, insert: true, update: true, delete: true },
    Logs: { read: true, insert: true, update: true, delete: true }
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
