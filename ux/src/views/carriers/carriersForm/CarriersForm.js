import React from 'react'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'

import { CarrierDocForm } from './CarrierDocForm'

export const CarriersForm = () => {
    return (
        <>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <Input name="carrierCode" placeholder="Nº Transportista" label="Nº Transportista" />
                    </div>
                    <div className="col-md-4">
                        <Input name="name" placeholder="Nombre" label="Nombre" />
                    </div>
                    <div className="col-md-3">
                        <Input name="NIF" placeholder="N.I.F." label="N.I.F." />
                    </div>
                    <div className="col-md-3">
                        <Select name="idStatus" label="Estado" endpoint="Status" />
                    </div>
                    <div className="col-md-3">
                        <Input name="email" type="email" placeholder="Correo electrónico" label="Correo electrónico" />
                    </div>
                    <div className="col-md-3">
                        <Input name="phone" placeholder="Teléfono 1" label="Teléfono 1" />
                    </div>
                    <div className="col-md-3">
                        <Input name="phone2" placeholder="Teléfono 2" label="Teléfono 2" />
                    </div>
                    <div className="col-md-3">
                        <Input name="startSchedule" type="time" placeholder="Horario de contacto" label="Horario de contacto" />
                    </div>
                    <div className="col-md-4">
                        <Input name="country" placeholder="País" label="País" />
                    </div>
                    <div className="col-md-4">
                        <Input name="state" placeholder="Provincia" label="Provincia" />
                    </div>
                    <div className="col-md-4">
                        <Input name="city" placeholder="Ciudad" label="Ciudad" />
                    </div>
                    <div className="col-md-8">
                        <Input name="address" placeholder="Dirección" label="Dirección" />
                    </div>
                    <div className="col-md-4">
                        <Input name="postcode" placeholder="Código postal" label="Código postal" />
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <CarrierDocForm />
                </div>
            </div>
        </>
    )
}
