import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'

import { addRepeaterRegister, handleGetForm, handleStartEditing, initNormalForm } from '../../redux/actions/normalForm/index.js'
import { CustomersForm } from './customerForm/CustomersForm'
import { save } from '../../utility/helpers/Axios/save'
import { exceptionController } from '../../utility/helpers/undefinedExceptionController'
import { FileContext } from '../../utility/context/FileContext'
import { SwalUploadAndSave } from '../../utility/helpers/SwalUploadAndSave'
import { uploadFile } from '../../utility/helpers/Axios/uploadFile'
import { handleChangeDestination, handleChangeUpload, handleCleanUp } from '../../redux/actions/fileUpload'
import { loadFiles } from '../../utility/helpers/Axios/loadFiles'
import { MkDir } from '../../utility/helpers/Axios/MkDir'

const structureForm = {
    addresses: [],
    contacts: [],
    documents: []
}

export const CustomerFormScreen = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [file, setFile] = useState('')
    const form = useSelector(state => state.normalForm)
    const { upload, filePath } = useSelector(state => state.fileUpload)
    const realFilePath = form.filePath ? form.filePath : filePath

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Customers', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const title = (id) ? 'Editar Cliente' : 'Añadir Cliente'
    const customerName = form.comercialName ? form.comercialName : title

    const preSubmit = (filePath2) => {
        return new Promise(async (resolve, reject) => {
            if (upload === 1) {
                const swalResp = await SwalUploadAndSave()
                if (swalResp === true) {
                    const formData = new FormData()
                    formData.append('filePath', filePath2)

                    for (const element of file) {

                        formData.append('file', element)
                    }

                    await uploadFile('FileManager', formData)

                    dispatch(handleChangeDestination(filePath2))
                    dispatch(handleChangeUpload(0))
                    const data = await loadFiles('FileManager', filePath2)
                    await data.map(
                        document => (
                            dispatch(addRepeaterRegister('documents', document))
                        )
                    )
                }
            }
            resolve('')
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const filePath2 = MkDir('Customers', realFilePath)

        await preSubmit(filePath2)

        const form2 = dispatch(handleGetForm())
        form2.then(async (value) => {
            const prettyForm = {
                ...value,
                idPaymentMethod: exceptionController(value.idPaymentMethod),
                idPayDay: exceptionController(value.idPayDay),
                idCustomerOrigin: exceptionController(value.idCustomerOrigin),
                idCustomerType: exceptionController(value.idCustomerType),
                idCustomerActivity: exceptionController(value.idCustomerActivity),
                idCustomerCategory: exceptionController(value.idCustomerCategory),
                idMode: exceptionController(value.idMode),
                idStatus: exceptionController(value.idStatus),
                idLanguage: exceptionController(value.idLanguage),
                filePath: filePath2,
                addresses: value.addresses.map(address => ({ ...address, addressType: exceptionController(address.addressType) })),
                contacts: value.contacts.map(contact => ({ ...contact, department: exceptionController(contact.department) }))
            }
            save('Customers', id, prettyForm)
            dispatch(handleCleanUp())
            history.push('/customers')
        })


    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <BreadCrumbs breadCrumbTitle={customerName} breadCrumbParent='Clientes' breadCrumbActive={title} />
                <FileContext.Provider value={{ file, setFile }}>
                    <CustomersForm />
                </FileContext.Provider>
                <ActionButtons />
            </form>
        </>
    )
}
