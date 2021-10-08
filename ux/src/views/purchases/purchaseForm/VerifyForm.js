import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GetSetNextId } from '../../../redux/actions/normalForm'

import { startAddSelectOptions } from '../../../redux/actions/selects'
import { deconstructSelect } from '../../../utility/helpers/deconstructSelect'
import { VerifyItemsRepeater } from './VerifyItemRepeater'

export const VerifyForm = () => {
    let { purchaseCode } = useSelector(state => state.normalForm)

    const dispatch = useDispatch()

    const { normalForm } = useSelector(state => state)
    useEffect(() => {
        if (normalForm.id === undefined) {
            dispatch(GetSetNextId("Purchases", 'purchaseCode'))
        } else purchaseCode = normalForm.id
    }, [])

    const { observations, purchaseDate, deliveryDate } = normalForm

    useEffect(() => {
        dispatch(startAddSelectOptions('Vendors', 'Vendors', 'comercialName'))
    }, [])

    const valueVendor = normalForm['idVendor'] ? deconstructSelect(normalForm['idVendor'], 'comercialName') : ''

    return (
        <>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <label className="control-label">Nº Pedido</label>
                        <h6>{purchaseCode}</h6>
                    </div>
                    <div className="col-md-4">
                        <label className="control-label">Proveedor</label>
                        <h6>{valueVendor.label}</h6>
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Fecha de compra</label>
                        <h6>{purchaseDate}</h6>
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Fecha de entrega</label>
                        <h6>{deliveryDate}</h6>
                    </div>


                    <div className="col-md-12">
                        <label className="control-label">Observaciones</label>
                        <h6>{observations}</h6>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <VerifyItemsRepeater />
                </div>
            </div>
        </>
    )
}
