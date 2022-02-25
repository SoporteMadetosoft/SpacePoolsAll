import { DoctorForm } from '../../../fixed/doctors/doctorForm'
import { DoctorList } from '../../../fixed/doctors/doctorList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Doctores',
    endPoint: 'Doctors',
    list: {
        columns: DoctorList
    },
    form: {
        form: DoctorForm
    }
}
const DoctorRoutes = [
    {
        path: '/doctor',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'doctors'
        }
    },
    {
        path: '/doctor/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'doctors'
        }
    },
    {
        path: '/doctor/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'doctors'
        }
    }
]

export default DoctorRoutes
