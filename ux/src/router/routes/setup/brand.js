import { BrandForm } from '../../../fixed/brand/brandForm'
import { BrandList } from '../../../fixed/brand/brandList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Marcas',
    endPoint: 'Brand',
    list: {
        columns: BrandList
    },
    form: {
        form: BrandForm
    }
}
const BrandRoutes = [
    {
        path: '/setup/vehicles/brand',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'customers'
        }
    },
    {
        path: '/setup/vehicles/brand/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'customers'
        }
    },
    {
        path: '/setup/vehicles/brand/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'customers'
        }
    }
]

export default BrandRoutes
