import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { ActionButtons } from '../../../components/actionButtons/ActionButtons'
import { save } from '../../../utility/helpers/Axios/save'
import { Form } from 'reactstrap'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'
import PasswordStrengthBar from 'react-password-strength-bar'
import { handleChangeController } from '../../../redux/actions/normalForm'
import Swal from 'sweetalert2'
import axios from 'axios'
import { endPoints } from "@fixed/endPoints"
import { exceptionController } from '../../../utility/helpers/undefinedExceptionController'
import generator from 'generate-password'
import InputPasswordToggle from '@components/input-password-toggle'
import { toast } from 'react-toastify'
import { validate, validator } from '../../../utility/formValidator/ValidationTypes'
import { setErrors, setSchema } from '../../../redux/actions/formValidator'

const formSchema = {
    login: { validations: [validator.isRequired] },
    fullname: { validations: [validator.isRequired] },
    idRole: { validations: [validator.isRequired] },
    idStatus: { validations: [validator.isRequired] }
}

export const UsersForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { id } = useParams()

    const { normalForm } = useSelector(state => state)
    const { formValidator } = useSelector(state => state)

    const pass = normalForm.password ? normalForm.password : ''

    useEffect(() => {
        dispatch(setSchema(formSchema))
    }, [])

    const SuccessProgressToast = () => (
        <>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <h6 className='toast-title'>¡Contraseña generada!</h6>
                </div>
            </div>
            <div className='toastify-body'>
                <span role='img' aria-label='toast-text'>
                    📋 Se ha copiado la contraseña generada al portapapeles.
                </span>
            </div>
        </>
    )

    const generatePass = (e) => {
        e.preventDefault()
        const password = generator.generate({
            length: 12,
            numbers: true,
            symbols: true
        })
        dispatch(handleChangeController('password', password))
        dispatch(handleChangeController('confirmPassword', password))
        navigator.clipboard.writeText(password)
        toast.success(<SuccessProgressToast />)
    }

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController('password', target.value))
    }

    const submit = async (e) => {
        e.preventDefault()
        const errors = validate(formValidator.schema, normalForm)


        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))

        } else {
            let error
            if (id) {
                if (normalForm.password) {
                    if (normalForm.password !== normalForm.confirmPassword) {
                        error = '¡Las contraseñas no coinciden!'
                        dispatch(handleChangeController('password', ''))
                        dispatch(handleChangeController('confirmPassword', ''))
                    } else if (normalForm.password.length < 8) {
                        error = '¡Contraseña demasiado corta!'
                        dispatch(handleChangeController('password', ''))
                        dispatch(handleChangeController('confirmPassword', ''))
                    }
                }
            } else {
                if (normalForm.password !== normalForm.confirmPassword) {
                    error = '¡Las contraseñas no coinciden!'
                    dispatch(handleChangeController('password', ''))
                    dispatch(handleChangeController('confirmPassword', ''))
                } else if (normalForm.password.length < 8) {
                    error = '¡Contraseña demasiado corta!'
                    dispatch(handleChangeController('password', ''))
                    dispatch(handleChangeController('confirmPassword', ''))
                }
                const token = localStorage.getItem('accessToken') || ''

                const { data } = await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints['Users']}/checkUser`, { username: normalForm.login }, {
                    headers: {
                        'Content-type': 'application/json',
                        'x-token': token
                    }
                })
                if (data.ok === false) {
                    error = '¡Este usuario ya está introducido!'
                    dispatch(handleChangeController('login', ''))
                }
            }
            if (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error
                })
            } else {
                const prettyForm = {
                    ...normalForm,
                    idStatus: exceptionController(normalForm.idStatus),
                    idRole: exceptionController(normalForm.idRole)
                }
                delete prettyForm.confirmPassword
                save('Users', id, prettyForm)
                history.push('/users')
            }
        }
    }

    return (
        <Form onSubmit={submit}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-3">
                        <Input name="login" label="Nombre de usuario" />
                    </div>
                    <div className="col-md-3">
                        <Input name="fullname" label="Nombre completo" />
                    </div>
                    <div className="col-md-3">
                        <Input type="email" name="email" label="Correo electrónico" />
                    </div>
                    <div className="col-md-3">
                        <Input type="number" name="phone" label="Teléfono" />
                    </div>
                    <div className="col-md-3">
                        <InputPasswordToggle onChange={handleInputChange} value={pass} name="password" label="Contraseña" />
                        <PasswordStrengthBar minLength="8" shortScoreWord="Demasiado corta" scoreWords={['Débil', 'Floja', 'Media', 'Buena', 'Fuerte']} password={pass} />
                        <button className="form-control btn btn-primary" color='primary' onClick={generatePass}>Generar contraseña</button>
                    </div>
                    <div className="col-md-3">
                        <Input type="password" name="confirmPassword" label="Confirmar Contraseña" />
                    </div>
                    <div className="col-md-3">
                        <Select name="idRole" label="Rol" endpoint="Roles" />
                    </div>
                    <div className="col-md-3">
                        <Select name="idStatus" label="Estado" endpoint="Status" />
                    </div>
                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}
