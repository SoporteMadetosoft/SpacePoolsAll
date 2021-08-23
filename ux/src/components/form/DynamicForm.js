import React from 'react'

export const DynamicForm = ({ formCustom, data = [] }) => {

    return (
        <div  className="card">
                    
            <div className="row card-body">
            {
                formCustom.map((item) => {
                    const {Component} = item
                    return <Component  
                        {...item} 
                        field_value={data[item.field_name]}
                    />       
                })
            } 
            </div>

        </div>
    )
}
