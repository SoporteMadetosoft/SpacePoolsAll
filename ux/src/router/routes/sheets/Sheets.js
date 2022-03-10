import { SheetForm } from '../../../fixed/sheet/sheetForm'
import { SheetList } from '../../../fixed/sheet/sheetList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Fichas',
    endPoint: 'Sheets',
    list: {
        columns: SheetList
    },
    form: {
        form: SheetForm
    }
}
const SheetsRoutes = [
    {
        path: '/sheets',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'sheets'
        }
    },
    {
        path: '/sheets/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'sheets'
        }
    },
    {
        path: '/sheets/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'sheets'
        }
    }
]

export default SheetsRoutes
