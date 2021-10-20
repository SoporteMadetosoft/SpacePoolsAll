import { formTypes } from "../../types/permisos/types"

// ** Initial State
const initialState = {
    Clientes: { read: true, insert: true, update: true, delete: true, execute: true },
    Proveedores: { read: true, insert: true, update: true, delete: true, execute: true },
    Transportistas: { read: true, insert: true, update: true, delete: true, execute: true },
    Vehiculos: { read: true, insert: true, update: true, delete: true, execute: true },
    Remolques: { read: true, insert: true, update: true, delete: true, execute: true },
    Piscinas: { read: true, insert: true, update: true, delete: true, execute: true },
    Articulos: { read: true, insert: true, update: true, delete: true, execute: true },
    Familias: { read: true, insert: true, update: true, delete: true, execute: true },
    Compras: { read: true, insert: true, update: true, delete: true, execute: true },
    Pedidos: { read: true, insert: true, update: true, delete: true, execute: true },
    Gestor_de_entregas: { read: true, insert: true, update: true, delete: true, execute: true },
    Produccion: { read: true, insert: true, update: true, delete: true, execute: true },
    Calendario: { read: true, insert: true, update: true, delete: true, execute: true },
    Usuarios: { read: true, insert: true, update: true, delete: true, execute: true },
    Roles: { read: true, insert: true, update: true, delete: true, execute: true },
    Metodos_de_pago: { read: true, insert: true, update: true, delete: true, execute: true },
    Departamentos: { read: true, insert: true, update: true, delete: true, execute: true },
    Tipos_de_direccion: { read: true, insert: true, update: true, delete: true, execute: true },
    Impuestos: { read: true, insert: true, update: true, delete: true, execute: true },
    Tipos_de_clientes: { read: true, insert: true, update: true, delete: true, execute: true },
    Categorias_de_cliente: { read: true, insert: true, update: true, delete: true, execute: true },
    Actividades: { read: true, insert: true, update: true, delete: true, execute: true },
    Origenes: { read: true, insert: true, update: true, delete: true, execute: true },
    Tipos_de_proveedor: { read: true, insert: true, update: true, delete: true, execute: true },
    Marcas: { read: true, insert: true, update: true, delete: true, execute: true },
    Modelos: { read: true, insert: true, update: true, delete: true, execute: true },
    Ubicaciones: { read: true, insert: true, update: true, delete: true, execute: true },
    Colores: { read: true, insert: true, update: true, delete: true, execute: true }
}

const permisosReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default permisosReducer
