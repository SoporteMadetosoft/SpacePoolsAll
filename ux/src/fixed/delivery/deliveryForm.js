import { validator } from "../../utility/formValidator/ValidationTypes"

export const DeliveryForm = {
    structure: {},
    errors: {
        patient: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [1, 1, 1],
            readOnly: true,
            name: 'id',
            label: 'Nº Albarán'
        },
        {
            col: [11, 11, 11],
            name: 'patient',
            label: 'Paciente'
        },
        {
            col: [3, 3, 3],
            name: 'surgeryNum',
            label: 'Nº Cirugía'
        },
        {
            col: [3, 3, 3],
            name: 'policyNum',
            label: 'Nº de poliza'
        },
        {
            col: [3, 3, 3],
            name: 'surgeryDate',
            label: 'Fecha cirugía',
            type: "date"
        },
        {
            col: [3, 3, 3],
            name: 'surgeryTime',
            label: 'Hora cirugía',
            type: "time"
        },
        {
            col: [6, 6, 6],
            name: 'deliveryOrigin',
            label: 'Origen',
            endPoint: 'DeliveryOrigin'
        },
        {
            col: [6, 6, 6],
            name: 'mutuaId',
            label: 'Mutua',
            endPoint: 'Mutuas'
        },
        {
            col: [6, 6, 6],
            name: 'doctorId',
            label: 'Doctor',
            endPoint: 'Doctors'
        },
        {
            col: [6, 6, 6],
            name: 'centerId',
            label: 'Centro',
            endPoint: 'Centers'
        },
        {
            col: [6, 6, 6],
            name: 'procedureId',
            label: 'Tipo de operación ',
            endPoint: 'Procedures'
        },
        {
            col: [6, 6, 6],
            name: 'instrumentId',
            label: 'Instrumento',
            endPoint: 'Instruments'
        },
        {
            col: [6, 6, 6],
            name: 'instrumentalId',
            label: 'Instrumental',
            endPoint: 'Instrumentals'
        },
        {
            col: [6, 6, 6],
            name: 'materialId',
            label: 'Materiales consumibles',
            endPoint: 'Materials'
        },
        {
            col: [12, 12, 12],
            name: 'observations',
            label: 'Comentarios'
        }
    ]
}