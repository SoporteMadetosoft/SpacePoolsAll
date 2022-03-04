import { validator } from "../../utility/formValidator/ValidationTypes"

export const SurgeryForm = {
    structure: {},
    errors: {
        policyNumber: { validations: [validator.isRequired] },
        patient: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [1, 1, 1],
            readonly: true,
            name: 'id',
            label: 'Nº Cirugía'
        },
        {
            col: [3, 3, 3],
            name: 'policyNumber',
            label: 'Nº de poliza'
        },
        {
            col: [4, 4, 4],
            name: 'patient',
            label: 'Paciente'
        },
        {
            col: [2, 2, 2],
            name: 'surgeryDate',
            label: 'Fecha cirugía'
        },
        {
            col: [2, 2, 2],
            name: 'surgeryTime',
            label: 'Hora cirugía'
        },
        {
            col: [2, 2, 2],
            name: 'mutuaId',
            label: 'Mutua',
            endPoint: 'Mutuas'
        },
        {
            col: [2, 2, 2],
            name: 'doctorId',
            label: 'Doctor',
            endPoint: 'Doctors'
        },
        {
            col: [2, 2, 2],
            name: 'centerId',
            label: 'Centro',
            endPoint: 'Centers'
        },
        {
            col: [2, 2, 2],
            name: 'procedureId',
            label: 'Procedimiento',
            endPoint: 'Procedures'
        },
        {
            col: [2, 2, 2],
            name: 'urgency',
            label: 'Urgencia',
            endPoint: 'Urgency',
            customOptions: [
                { value: true, label: 'Activo' },
                { value: false, label: 'Inactivo' }
            ]
        },
        {
            col: [2, 2, 2],
            name: 'demo',
            label: 'Demo',
            endPoint: 'Demo',
            customOptions: [
                { value: true, label: 'Activo' },
                { value: false, label: 'Inactivo' }
            ]
        },
        {
            col: [12, 12, 12],
            name: 'comments',
            label: 'Comentarios'
        }
    ]
}