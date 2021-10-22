// ** Third Party Components
import { Card, CardBody, CardText, Row, Col, Table } from 'reactstrap'
import themeConfig from '@configs/themeConfig'
import { useParams } from 'react-router'
import SignatureCanvas from 'react-signature-canvas'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeController, handleStartEditing, initNormalForm } from '../../../redux/actions/normalForm'

const structureForm = {
  baseItems: [],
  extraItems: []
}

const PreviewCard = () => {

  const { id } = useParams()
  const dispatch = useDispatch()

  const { normalForm } = useSelector(state => state)

  const cn = normalForm['orderData'] !== undefined ? normalForm['orderData']['idCustomer'].comercialName : ''
  const deliveryAddress = normalForm['orderData'] !== undefined ? normalForm['orderData']['customerData'][0].deliveryAddress : ''
  const phone = normalForm['orderData'] !== undefined ? normalForm['orderData']['customerData'][0].phone : ''
  const email = normalForm['orderData'] !== undefined ? normalForm['orderData']['customerData'][0].email : ''
  const carrier = normalForm['idCarrier'] !== undefined ? normalForm['idCarrier'] : ''
  const poolName = normalForm['idPool'] !== undefined ? normalForm['idPool'].fabricationName : ''
  const poolPrice = normalForm['idPool'] !== undefined ? normalForm['idPool'].price : ''
  const tax = normalForm['orderData'] !== undefined ? normalForm['orderData']['idTax'].name : ''
  const base = normalForm['orderData'] !== undefined ? normalForm['orderData']['baseItems'] : ''
  const extra = normalForm['orderData'] !== undefined ? normalForm['orderData']['extraItems'] : ''

  const price = normalForm['orderData'] ? normalForm['orderData'].price : ''
  const deliveryDate = normalForm ? normalForm.deliveryDate : ''
  const observations = normalForm['orderData'] ? normalForm['orderData'].observations : ''

  const data = {
    customer: {
      name: cn,
      address: deliveryAddress,
      phone,
      email
    },
    deliveryDate,
    idCarrier: {
      name: carrier.name,
      nif: carrier.NIF
    },
    piscina: {
      name: poolName,
      price: poolPrice
    },
    baseItems: base,
    extraItems: extra,
    tax,
    total: price,
    observations
  }

  useEffect(() => {
    if (id) {
      dispatch(handleStartEditing('Delivery', id))
    }
    dispatch(initNormalForm(structureForm))
  }, [initNormalForm])

  let sigCanvas = {}

  const handleEndSignature = () => {
    dispatch(handleChangeController('signature', sigCanvas.getTrimmedCanvas().toDataURL('image/png')))
  }


  return (
    <Card className='invoice-preview-card'>
      <CardBody className='invoice-padding pb-0'>
        {/* Header */}
        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
          <div>
            <div className='logo-wrapper'>
              <img src={themeConfig.app.appLogoImage} style={{ width: '120px' }} alt='logo' />

              <h3 className='text-primary invoice-logo'>Space Pools</h3>
            </div>
            <CardText className='mb-25'>Office 149, 450 South Brand Brooklyn</CardText>
            <CardText className='mb-25'>San Diego County, CA 91905, USA</CardText>
            <CardText className='mb-0'>+1 (123) 456 7891, +44 (876) 543 2198</CardText>
          </div>
          <div className='mt-md-0 mt-2'>
            <h4 className='invoice-title'>
              Entrega <span className='invoice-number'>#{id}</span>
            </h4>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>F. de entrega:</p>
              <p className='invoice-date'>{data.deliveryDate}</p>
            </div>
          </div>
        </div>
        {/* /Header */}
      </CardBody>

      <hr className='invoice-spacing' />

      {/* Address and Contact */}
      <CardBody className='invoice-padding pt-0'>
        <Row className='invoice-spacing'>
          <Col className='p-0' lg='8'>
            <h6 className='mb-2'>Datos del receptor:</h6>
            <h6 className='mb-25'>{data.customer.name}</h6>
            <CardText className='mb-25'>{data.customer.address}</CardText>
            <CardText className='mb-25'>{data.customer.phone}</CardText>
            <CardText className='mb-25'>{data.customer.email}</CardText>
          </Col>
          <Col className='p-0 mt-xl-0 mt-2' lg='4'>
            <h6 className='mb-2'>Transportista:</h6>
            <table>
              <tbody>
                <tr>
                  <td className='pr-1'>Nombre</td>
                  <td>
                    <span className='font-weight-bolder'>{data.idCarrier.name}</span>
                  </td>
                </tr>
                <tr>
                  <td className='pr-1'>NIF: </td>
                  <td>{data.idCarrier.nif}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </CardBody>
      {/* /Address and Contact */}

      {/* Invoice Description */}
      <Table responsive>
        <thead>
          <tr>
            <th className='py-1'>Artículo</th>
            <th className='py-1'>Base</th>
            <th className='py-1'>IVA</th>
            <th className='py-1'>Cantidad</th>
            <th className='py-1'>Total</th>
          </tr>
        </thead>
        <tbody>

          <tr className='border-bottom'>
            <td className='py-1'>
              <p className='card-text font-weight-bold mb-25'>{data.piscina.name}</p>
              {
                (data['baseItems'] !== undefined && data['baseItems'] !== '') ? data['baseItems'].map(obj => {
                  return (
                    <p className='card-text text-nowrap'>
                      - {obj.name} ( {obj.idColor.name} )
                    </p>
                  )
                }) : ''
              }
            </td>
            <td className='py-1'>
              <span className='font-weight-bold'>{(data.piscina.price * 1).toFixed(2)}€</span>
            </td>
            <td className='py-1'>
              <span className='font-weight-bold'>{data.tax}%</span>
            </td>
            <td className='py-1'>
              <span className='font-weight-bold'>1</span>
            </td>
            <td className='py-1'>
              <span className='font-weight-bold'>{(data.piscina.price * (1 + (data.tax / 100))).toFixed(2)}€</span>
            </td>
          </tr>

          {
            (data['extraItems'] !== undefined && data['extraItems'] !== '') ? data['extraItems'].map(obj => {
              return (
                <tr className='border-bottom'>
                  <td className='py-1'>
                    <p className='card-text font-weight-bold mb-50'>{obj.idItem.name}</p>
                    <p className='card-text text-nowrap'>
                      {obj.idColor.name}
                    </p>
                  </td>
                  <td className='py-1'>{(obj.coste * 1).toFixed(2)}€</td>
                  <td className='py-1'>{data.tax}%</td>
                  <td className='py-1'>
                    <span className='font-weight-bold'>{obj.quantity}</span>
                  </td>
                  <td className='py-1'>{((obj.coste * obj.quantity) * (1 + (data.tax / 100))).toFixed(2)}€</td>
                </tr>

              )
            }) : ''
          }

        </tbody>
      </Table>
      {/* /Invoice Description */}

      {/* Total & Sales Person */}
      <CardBody className='invoice-padding pb-0'>
        <Row className='invoice-sales-total-wrapper'>
          <Col className='d-flex justify-content-end' md='8' order={{ md: 6, lg: 8 }}>
            {
              (normalForm['signature'] !== undefined && normalForm['signature'] !== '') ?
                (<>
                  <img src={normalForm['signature']} style={{ width: 700, height: 300 }} />
                </>)
                :
                (<>
                  <SignatureCanvas onEnd={handleEndSignature} penColor='blue' backgroundColor={'#F2F2F2'}
                    canvasProps={{ width: 700, height: 300, className: 'sigCanvas' }}
                    ref={(ref) => { sigCanvas = ref }}
                  />
                </>)
            }

          </Col>
          <Col className='d-flex justify-content-end' md='4' order={{ md: 6, lg: 4 }}>
            <div className='invoice-total-wrapper'>
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Subtotal:</p>
                <p className='invoice-total-amount'>{(data.total / (1 + (data.tax / 100))).toFixed(2)}€</p>
              </div>
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>IVA:</p>
                <p className='invoice-total-amount'>{data.tax}%</p>
              </div>
              <hr className='my-50' />
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Total:</p>
                <p className='invoice-total-amount'>{(data.total * 1).toFixed(2)}€</p>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
      {/* /Total & Sales Person */}

      <hr className='invoice-spacing' />

      {/* Invoice Note */}
      <CardBody className='invoice-padding pt-0'>
        <Row>
          <Col sm='12'>
            <span>
              {data.observations}
            </span>
          </Col>
        </Row>
      </CardBody>
      {/* /Invoice Note */}
    </Card>
  )
}

export default PreviewCard
