import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'

import { GetSetNextId, handleGetForm, handleStartEditing, initNormalForm } from '../../redux/actions/normalForm/index.js'
import { save } from '../../utility/helpers/Axios/save'
import { PurchaseForm } from './purchaseForm/PurchaseForm'
import { exceptionController } from '../../utility/helpers/undefinedExceptionController'
import { handleCleanUp } from '../../redux/actions/fileUpload'
import { validate, validator } from '../../utility/formValidator/ValidationTypes'
import { setErrors, setSchema } from '../../redux/actions/formValidator'

const structureForm = {
    items: [],
    itemColors: []
}
const formSchema = {
    idVendor: { validations: [validator.isRequired] },
    purchaseDate: { validations: [validator.isRequired] },
    deliveryDate: { validations: [validator.isRequired] }
}

export const PurchaseFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const { normalForm, formValidator } = useSelector(state => state)
    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Purchases', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    useEffect(() => {

        if (normalForm.id === undefined) {
            dispatch(GetSetNextId("Purchases", 'purchaseCode'))
        } else purchaseCode = normalForm.id
        dispatch(setSchema(formSchema))
    }, [])

    const title = (id) ? 'Editar Compra' : 'Añadir Compra'
    const customerName = form.purchasecod ? form.comercialName : title

    const handleSubmit = async (e) => {
        e.preventDefault()

        const errors = validate(formValidator.schema, normalForm)

        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))


        } else {

            const form2 = dispatch(handleGetForm())
            form2.then(async (value) => {
                const prettyForm = {
                    ...value,
                    idVendor: exceptionController(value.idVendor),
                    items: form.items.map(item => ({ idItem: exceptionController(item.idItem), quantity: item.quantity })),
                    itemColors: form.itemColors.map(item => ({ idItem: exceptionController(item.idItem), idColor: exceptionController(item.idColor), quantity: item.quantity }))
                }

                save('Purchases', id, prettyForm)
                dispatch(handleCleanUp)
                history.push('/purchases')

            })
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Compras' breadCrumbActive={title} />
                <PurchaseForm />
                <ActionButtons />
            </form>
        </>
    )
}
