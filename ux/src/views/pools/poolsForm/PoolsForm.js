
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'
import { PoolsItemsForm } from './PoolsItemsForm'
import { PoolsRawForm } from './PoolsRawForm'
import { useDispatch, useSelector } from 'react-redux'
import { handleCalculatePriceIVA, handleCalcuteTotalCost } from '../../../redux/actions/pools'
import React, { useEffect } from 'react'

export const PoolsForm = () => {
    const {value} = useSelector(state => state.poolsReducer)

    const dispatch = useDispatch()
   //useEffect(() => {
   //   console.log("he cargado?")
   //   dispatch(handleCalcuteTotalCost())
   //})

   function calculateAfterLoad() {
        setTimeout(function() {
            dispatch(handleCalcuteTotalCost())
        },200)  
   }

    return (
        
        <>
            <script>
                window.addEventListener("load", function(event) {
                    calculateAfterLoad()
                })
            </script>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <Input name="poolCode" placeholder="Nº Piscina" label="Nº Piscina" />
                    </div>
                    <div className="col-md-4">
                        <Input name="fabricationName" placeholder="Nombre  de fabricación" label="Nombre  de fabricación"/>
                    </div>
                    <div className="col-md-3">
                        <Input name="simultaneousFabrications" type="number" placeholder="Nº máximo de fabriación" label="Nº máximo de fabriación" />
                    </div>
                    <div className="col-md-3">
                        <Select name="idStatus" label="Estado" endpoint="Status" />
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
                    <label className="control-label">Precio</label>
                        <input   className={`form-control`} 
                        name="price" 
                        placeholder="Precio" 
                          />
                    </div>
                    <div className="col-md-3">
                    <label className="control-label">Cost</label>
                    <input
                        className={`form-control`}
                        name="cost"
                        value={value}
                        readOnly
                    />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">

                    <div className="card">
                        <div className=" card-body row px-3">
                            <PoolsItemsForm />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className=" card-body row px-3">
                            <PoolsRawForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}