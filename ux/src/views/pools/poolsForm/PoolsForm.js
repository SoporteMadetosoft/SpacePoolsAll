import React from 'react'
import { useSelector } from 'react-redux'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'

export const PoolsForm = () => {

    const { selectReducer } = useSelector(state => state)

    const { statusOpt } = selectReducer

    return (
        <>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <Input name="poolCode" placeholder="Nº Piscina" label="Nº Piscina" />
                    </div>
                    <div className="col-md-4">
                        <Input name="fabricationName" placeholder="Nombre  de fabricación" label="Nombre  de fabricación" />
                    </div>
                    <div className="col-md-3">
                        <Input name="simultaneousFabrications" placeholder="Nº máximo de fabriación" label="Nº máximo de fabriación" />
                    </div>
                    <div className="col-md-3">
                        <Select name="idStatus" label="Estado" options={statusOpt} />
                    </div>
                    <div className="col-md-3">
                        <Input name="nameEuropa" placeholder="Nombre Europa" label="Nombre Europa" />
                    </div>
                    <div className="col-md-3">
                        <Input name="nameSpace" placeholder="Nombre Space" label="Nombre Space" />
                    </div>
                    <div className="col-md-3">
                        <Input name="nameSociedad" placeholder="Nombre Sociedad" label="Nombre Sociedad" />
                    </div>
                    <div className="col-md-3">
                        <Input name="nameHydrius" placeholder="Nombre Hydrus" label="Nombre Hydrus" />
                    </div>
                    <div className="col-md-3">
                        <Input name="priceVATout" placeholder="Precio sin IVA" label="Precio sin IVA" />
                    </div>
                    <div className="col-md-3">
                        <Input name="priceVATin" placeholder="Precio con IVA" label="Precio con IVA" />
                    </div>
                    <div className="col-md-3">
                        <Input name="cost" placeholder="Coste" label="Coste" />
                    </div>
                </div>
            </div>

        </>
    )
}
