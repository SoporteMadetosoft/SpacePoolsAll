import React from 'react'
import { Input } from '../../../components/form/inputs/Input'
import { SelectArbol } from '../../../components/form/inputs/SelectArbol'

export const ItemsFamilyForm = () => {

    return (
        <>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <Input name="familyCode" placeholder="Nº Familia" label="Nº Familia" />
                    </div>
                    <div className="col-md-5">
                        <Input name="name" placeholder="Nombre" label="Nombre" />
                    </div>
                    <div className="col-md-5">
                        <SelectArbol name="parent" label="Padre" endpoint="Family" />
                    </div>
                </div>
            </div>
        </>
    )
}
