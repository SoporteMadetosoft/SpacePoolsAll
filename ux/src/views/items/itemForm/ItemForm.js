import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'
import { handleChangeController } from '../../../redux/actions/normalForm'

export const ItemForm = () => {
    const dispatch = useDispatch()

    const { normalForm } = useSelector(state => state)

    const { description } = normalForm

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }
    return (
        <>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <Input name="itemCode" placeholder="Nº Artículo" label="Nº Artículo" />
                    </div>
                    <div className="col-md-4">
                        <Input name="name" placeholder="Nombre" label="Nombre" />
                    </div>
                    <div className="col-md-3">
                        <Select name="family" label="Familia" endpoint="Family" />
                    </div>
                    <div className="col-md-3">
                        <Select name="itemType" label="Tipo de artículo" endpoint="ItemType" />
                    </div>
                    <div className="col-md-3">
                        <Input type="number" name="priceVATout" placeholder="Precio sin IVA" label="Precio sin IVA" />
                    </div>
                    <div className="col-md-3">
                        <Input type="number" name="priceVATin" placeholder="Precio con IVA" label="Precio con IVA" />
                    </div>
                    <div className="col-md-3">
                        <Input type="number" name="cost" placeholder="Coste" label="Coste" />
                    </div>
                    <div className="col-md-3">
                        <Input type="number" name="maximumCost" placeholder="Coste máximo" label="Coste máximo" />
                    </div>
                    <div className="col-md-3">
                        <Input type="number" name="minimumStock" placeholder="Stock mínimo" label="Stock mínimo" />
                    </div>
                    <div className="col-md-3">
                        <Input type="number" name="stock" placeholder="Stock" label="Stock" />
                    </div>
                    <div className="col-md-3">
                        <Select name="place" placeholder="Ubicación" endpoint="Place" />
                    </div>
                    <div className="col-md-12">
                        <label className="control-label">Descripción</label>
                        <textarea
                            className="form-control"
                            name="description"
                            placeholder="Descripción"
                            value={description}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
