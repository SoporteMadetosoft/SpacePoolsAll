import React from 'react'
import { useSelector } from 'react-redux'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'

export const ItemsFamilyForm = () => {

    const { selectReducer } = useSelector(state => state)

    const { statusOpt } = selectReducer

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
                        <Select name="idStatus" label="Estado" endpoint="Family" />
                    </div>
                </div>
            </div>
        </>
    )
}
