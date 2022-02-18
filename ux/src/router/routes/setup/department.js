import { DepartmentForm } from '../../../fixed/department/departmentForm'
import { DepartmentList } from '../../../fixed/department/departmentList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Departamentos',
    endPoint: 'Department',
    list: {
        columns: DepartmentList
    },
    form: {
        form: DepartmentForm
    }
}
const DepartmentRoutes = [
    {
        path: '/setup/general/department',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'department'
        }
    },
    {
        path: '/setup/general/department/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'department'
        }
    },
    {
        path: '/setup/general/department/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'department'
        }
    }
]

export default DepartmentRoutes
