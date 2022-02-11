import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { handleLogout } from '../authentication/redux/actions'

import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'

import notAuthImg from '@src/assets/images/pages/not-authorized.svg'

import '@styles/base/pages/page-misc.scss'

const NotAuthorized = () => {

  const dispatch = useDispatch()
  useEffect(() => dispatch(handleLogout()), [])

  return (
    <div className='misc-wrapper'>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>¡Área restringida! 🔐</h2>
          <p className='mb-2'>
            No estás autorizado a ver esta parte del programa.
          </p>
          <Button tag={Link} to='/' color='primary' className='btn-sm-block mb-1'>
            Volver atrás
          </Button>
          <img className='img-fluid' src={notAuthImg} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default NotAuthorized
