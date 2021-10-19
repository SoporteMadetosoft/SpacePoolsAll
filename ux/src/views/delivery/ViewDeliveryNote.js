import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BreadCrumbs from '@components/breadcrumbs'

import { ActionButtons } from '../../components/actionButtons/ActionButtons'

import { handleStartEditing, initNormalForm } from '../../redux/actions/normalForm/index.js'
import { ViewDeliveryForm } from './purchaseForm/ViewDeliveryForm'
import { getCItemsByOrderId } from '../../redux/actions/canvas'
import Row from 'reactstrap/lib/Row'
import Col from 'reactstrap/lib/Col'
import PreviewCard from './purchaseForm/PreviewCard'
import { handleCleanUp } from '../../redux/actions/fileUpload'
import { save } from '../../utility/helpers/Axios/save'

const structureForm = {
    baseItems: [],
    extraItems: []
}

export const ViewDeliveryNote = () => {

    const { id } = useParams()

    const history = useHistory()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Delivery', id))
        }
        dispatch(initNormalForm(structureForm))
    }, [initNormalForm])

    const title = 'Ver Hoja de Entrega'

    const handleSubmit = async (e) => {
        e.preventDefault()
        const prettyForm = {
            id: form.id,
            signature: form.signature
        }
        save('Delivery', id, prettyForm)
        dispatch(handleCleanUp())
        history.push('/delivery')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <BreadCrumbs breadCrumbTitle={title} breadCrumbParent='Gestor de entregas' breadCrumbActive={title} />
                <div className='invoice-preview-wrapper'>
                    <Row className='invoice-preview'>
                        <Col xl={12} md={12} sm={12}>
                            <PreviewCard />
                        </Col>
                    </Row>
                </div>
                <ActionButtons />
            </form>
        </>
    )
}
