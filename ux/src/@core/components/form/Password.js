import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import PasswordStrengthBar from 'react-password-strength-bar'

import Swal from 'sweetalert2'
import axios from 'axios'
import { endPoints } from "@fixed/endPoints"
import generator from 'generate-password'
import InputPasswordToggle from '@components/input-password-toggle'
import { toast } from 'react-toastify'
import { handleChangeController } from '../../../redux/actions/normalForm'
import { Input } from './Input'

export const InputPassword = () => {
    const dispatch = useDispatch()

    const { id } = useParams()

    const { normalForm } = useSelector(state => state)

    const pass = normalForm.password ? normalForm.password : ''

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
        }

    }

    return (
        <>
            <div className='col-md-3'>
                <div className="mt-2">
                    <InputPasswordToggle onChange={handleInputChange} value={pass} name="password" label="Contraseña" />
                    <PasswordStrengthBar minLength="8" shortScoreWord="Demasiado corta" scoreWords={['Débil', 'Floja', 'Media', 'Buena', 'Fuerte']} password={pass} />
                    <button className="form-control btn btn-primary" color='primary' onClick={generatePass}>Generar contraseña</button>
                </div>
            </div>

            <div className='col-md-3'>
                <div className="mt-2">
                    <Input type="password" name="confirmPassword" label="Confirmar Contraseña" />
                </div>
            </div>
        </>
    )
}
