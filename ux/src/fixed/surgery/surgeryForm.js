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
            col: [6, 6, 6],
            name: 'patient',
            label: 'Paciente'
        },
        {
            col: [3, 3, 3],
            name: 'policyNumber',
            label: 'Nº de poliza'
        },
        {
            col: [1, 1, 1],
            name: 'urgency',
            label: 'Urgencia',
            endPoint: 'Urgency',
            type: "toggle"
        },
        {
            col: [1, 1, 1],
            name: 'demo',
            label: 'Demo',
            endPoint: 'Demo',
            type: "toggle"
        },
        {
            col: [5, 5, 5],
            name: 'mutuaId',
            label: 'Mutua',
            endPoint: 'Mutuas'
        },
        {
            col: [5, 5, 5],
            name: 'doctorId',
            label: 'Doctor',
            endPoint: 'Doctors'
        },
        {
            col: [2, 2, 2],
            name: 'surgeryDate',
            label: 'Fecha cirugía',
            type: 'date'
        },
        {
            col: [5, 5, 5],
            name: 'centerId',
            label: 'Centro',
            endPoint: 'Centers'
        },
        {
            col: [5, 5, 5],
            name: 'procedureId',
            label: 'Procedimiento',
            endPoint: 'Procedures'
        },
        {
            col: [2, 2, 2],
            name: 'surgeryTime',
            label: 'Hora cirugía',
            type: 'time'
        },
        {
            col: [12, 12, 12],
            name: 'comments',
            label: 'Comentarios'
        }
    ]
}