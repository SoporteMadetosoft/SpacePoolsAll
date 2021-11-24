import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetSetNextId, handleChangeController, handleCleanSection } from '../../../redux/actions/normalForm'
import { ItemsRepeater } from './ItemsRepeater'
import { Input } from '../../../components/form/inputs/Input'
import { startAddSelectOptions, startAddSelectStatus } from '../../../redux/actions/selects'
import { Select } from '../../../components/form/inputs/Select'
import { ItemsRepeaterColor } from './ItemsRepeaterColor'
import { setSchema } from '../../../redux/actions/formValidator'


const formSchema = {

}

export const PurchaseForm = () => {
    let { purchaseCode } = useSelector(state => state.normalForm)

    const dispatch = useDispatch()

    const { normalForm } = useSelector(state => state)
    useEffect(() => {

        if (normalForm.id === undefined) {
            dispatch(GetSetNextId("Purchases", 'purchaseCode'))
        } else purchaseCode = normalForm.id
        dispatch(setSchema(formSchema))

    }, [])

    const { observations } = normalForm

    

    useEffect(() => {
        dispatch(startAddSelectOptions('Vendors', 'Vendors', 'comercialName'))
        dispatch(startAddSelectStatus('Vendors', 'Vendors', 'comercialName'))
    }, [])

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    const handleSelectChange = ({ value, label }) => {
        dispatch(handleCleanSection('items'))
        dispatch(handleCleanSection('itemColors'))
        dispatch(handleChangeController('idVendor', { id: value, comercialName: label }))
    }

    return (
        <>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <label className="control-label">Nº Pedido</label>
                        <input
                            className={`form-control`}
                            name="purchaseCode"
                            value={purchaseCode}
                            readOnly
                        />
                    </div>
                    <div className="col-md-4">
                        {/* <Select required="true" name="idVendor" label="Proveedor" endpoint="Vendors" labelName="comercialName" /> */}
                        <Select
                            name="idVendor"
                            label="Proveedor"
                            endpoint='Vendors'
                            labelName="comercialName"
                            onSelect={handleSelectChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <Input name="purchaseDate" type="date" label="Fecha de compra" />
                    </div>
                    <div className="col-md-3">
                        <Input name="deliveryDate" type="date" label="Fecha de entrega" />
                    </div>


                    <div className="col-md-12">
                        <label className="control-label">Observaciones</label>
                        <textarea
                            className="form-control"
                            name="observations"
                            value={observations}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <ItemsRepeater />
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <ItemsRepeaterColor />
                </div>
            </div>
        </>
    )
}
