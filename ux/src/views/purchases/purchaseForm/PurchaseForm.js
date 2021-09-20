import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeController, setIdInXCode } from '../../../redux/actions/normalForm'


import { ItemsRepeater } from './ItemsRepeater'

import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'

export const PurchaseForm = () => {
    let {purchaseCode} = useSelector(state =>  state.normalForm)



    const dispatch = useDispatch()

    const { normalForm, selectReducer } = useSelector(state => state)
    useEffect(() => {
        if (normalForm.id === undefined) {
            dispatch(setIdInXCode("Purchases","purchaseCode"))
        } else purchaseCode = normalForm.id
    }, [])

    const { observations } = normalForm

    const {
        idVendor
    } = selectReducer

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
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
                        <Select name="idVendor" placeholder="Proveedor" label="Proveedor" endpoint="Vendors" labelName="comercialName" />
                    </div>
                    <div className="col-md-2">
                        <Input name="purchaseDate" type="date" placeholder="Fecha de compra" label="Fecha de compra" />
                    </div>
                    <div className="col-md-2">
                        <Input name="deliveryDate" type="date" placeholder="Fecha de entrega" label="Fecha de entrega" />
                    </div>
                    <div className="col-md-2">
                        <Input name="phone" placeholder="Teléfono" label="Teléfono" />
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
        </>
    )
}
