import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'

import { GetSetNextId, handleGetForm, handleStartEditing, initNormalForm } from '../../redux/actions/normalForm/index.js'
import { save } from '../../utility/helpers/Axios/save'
import { PurchaseForm } from './purchaseForm/PurchaseForm'
import { exceptionController } from '../../utility/helpers/undefinedExceptionController'
import { startAddSelectStatus } from '../../redux/actions/selects'
import { handleCleanUp } from '../../redux/actions/fileUpload'
import { validate, validator } from '../../utility/formValidator/ValidationTypes'
import { setErrors, setSchema } from '../../redux/actions/formValidator'

const structureForm = {
    items: []
}
const formSchema = {
    idVendor: { validations: [validator.isRequired] },
    purchaseDate: { validations: [validator.isEmail] },
    deliveryDate: { validations: [validator.isRequired] }
}

export const PurchaseFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const { normalForm, formValidator } = useSelector(state => state)
    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        // dispatch(startAddSelectStatus('Vendors','Vendors','comercialName'))
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

<<<<<<< Updated upstream
        const prettyForm = {
            ...form,
            idVendor: exceptionController(form.idVendor),
            items: form.items.map(item => ({ idItem: exceptionController(item.idItem), quantity: item.quantity, idColor: exceptionController(item.idColor) }))
        }

        save('Purchases', id, prettyForm)
        history.push('/purchases')
=======
        const errors = validate(formValidator.schema, normalForm)

        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))


        } else {

            const form2 = dispatch(handleGetForm())
            form2.then(async (value) => {
                const prettyForm = {
                    ...value,
                    idVendor: exceptionController(value.idVendor),
                    items: form.items.map(item => ({ idItem: exceptionController(item.idItem), quantity: item.quantity }))
                }

                save('Purchases', id, prettyForm)
                dispatch(handleCleanUp)
                history.push('/purchases')

            })
        }
>>>>>>> Stashed changes
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
