const isEmail = (value) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(value)
}

const isRequired = (value) => {
    return !!value && Object.keys(value).length !== 0
}
export const validate = (schema, form) => {
    console.log(schema, form)
    const errors = {}
    Object.keys(schema).forEach( inputName => {
        if (Array.isArray(schema[inputName].validations)) {
            schema[inputName].validations.forEach( validationType => {
                if ( !validationType( form[inputName] )) {
                    errors[inputName] = validationType.name
                }
            })
        } else {
            form[inputName].forEach( (repForm, index) => {
                Object.keys(schema[inputName]).forEach( (repInputName) => {
                    schema[inputName][repInputName].validations.forEach( validationType => {
                        if ( !validationType(repForm[repInputName]) ) {
                            const oldErrors =  errors[inputName] && errors[inputName][index] ? errors[inputName][index] : {}
                            errors[inputName] = {...errors[inputName], [index]: { ...oldErrors, [repInputName]: validationType.name}}
                        }
                    })                
                })
            })
            
        }
        
    })
    return errors
}

const length = (value, { min, max }) => {
    return value.length > min || max < validate.length 
}

const inFormat = (regex) => {
    regex.test(value)
}

const repeaterValidation = () => {
   
}

export const validator = {
    isEmail,
    isRequired,
    length
}

