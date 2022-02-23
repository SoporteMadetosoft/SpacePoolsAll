import { BrandForm } from '../../../fixed/setup/brand/brandForm'
import { BrandList } from '../../../fixed/setup/brand/brandList'
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
            resource: 'brand'
        }
    },
    {
        path: '/setup/vehicles/brand/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'brand'
        }
    },
    {
        path: '/setup/vehicles/brand/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'brand'
        }
    }
]

export default BrandRoutes
