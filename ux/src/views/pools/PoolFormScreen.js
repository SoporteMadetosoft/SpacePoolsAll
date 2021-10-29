import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'
import { save } from '../../utility/helpers/Axios/save'
import { GetSetNextId, handleGetForm, handleStartEditing, initNormalForm } from '../../redux/actions/normalForm'
import { handleCleanUp } from '../../redux/actions/fileUpload'
import { PoolsForm } from './poolsForm/PoolsForm'
import { exceptionController } from '../../utility/helpers/undefinedExceptionController'
import { validate, validator } from '../../utility/formValidator/ValidationTypes'
import { setErrors, setSchema } from '../../redux/actions/formValidator'

const structureForm = {
    items: [],
    raws: []
}
const formSchema = {
   
    idStatus: { validations: [validator.isRequired] },
    fabricationName: { validations: [validator.isRequired] }
    
}

export const PoolFormScreen = () => {
    let { poolCode } = useSelector(state => state.normalForm)
    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)
    const { formValidator, normalForm } = useSelector(state => state)
    const { price } = useSelector(state => state.ordersReducer)
    
    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Pools', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    useEffect(() => {
        if (normalForm.id === undefined) {
            dispatch(GetSetNextId("Pools", 'poolCode'))

        } else poolCode = normalForm.id
        dispatch(setSchema(formSchema))


    })

    const titulo = (id) ? 'Editar Piscina' : 'Añadir Piscina'
    const customerName = (form.name) ? form.name : titulo

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = validate(formValidator.schema, normalForm)
        console.log(errors)

        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))
            console.log('error')
        } else {

            const form2 = dispatch(handleGetForm())
            form2.then(async (value) => {
                const prettyForm = {
                    ...value,
                    cost: price,
                    idStatus: exceptionController(value.idStatus),
                    items: form.items.map(item => ({ quantity: item.quantity, idItem: exceptionController(item.idItem), idColor: exceptionController(item.idColor) })),
                    raws: form.raws.map(raw => ({ quantity: raw.quantity, idItem: exceptionController(raw.idItem), idColor: exceptionController(raw.idColor) }))
                }
                save('Pools', id, prettyForm)
                dispatch(handleCleanUp())
                history.push('/pools')

            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Piscinas' breadCrumbActive={titulo} />
            <PoolsForm />
            <ActionButtons />
        </form>
    )
}
