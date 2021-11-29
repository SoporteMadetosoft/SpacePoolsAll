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
const logos = [
  require(`@src/assets/images/logo/logo.png`).default,
  require(`@src/assets/images/logo/logo-hydryus.png`).default,
  require(`@src/assets/images/logo/logo-europa.png`).default,
  require(`@src/assets/images/logo/logo-sociedad.png`).default
]

const poolNames = [
  'nameSpace',
  'nameHydryus',
  'nameEuropa',
  'nameSociedad'
]

const PreviewCard = () => {

  const { id } = useParams()
  const dispatch = useDispatch()

  const { normalForm } = useSelector(state => state)

  const customerName = normalForm['customer'] !== undefined ? normalForm['customer'].name : ''
  const deliveryAddress = normalForm['customer'] !== undefined ? normalForm['customer']['customerData'][0].deliveryAddress : ''
  const phone = normalForm['customer'] !== undefined ? normalForm['customer']['customerData'][0].phone : ''
  const email = normalForm['customer'] !== undefined ? normalForm['customer']['customerData'][0].email : ''
  const logo = normalForm['customer'] !== undefined ? normalForm['customer'].origin.logo.id : ''
  const info = normalForm['customer'] !== undefined ? normalForm['customer'].origin.info.split('\n') : ''
  const language = normalForm['customer'] !== undefined ? normalForm['customer'].language.id : ''

  const carrierName = normalForm['carrier'] !== undefined ? normalForm['carrier'].name : ''
  const carrierNIF = normalForm['carrier'] !== undefined ? normalForm['carrier'].NIF : ''
  const vehiclePlate = normalForm['vehiclePlate'] !== undefined ? normalForm['vehiclePlate'] : ''
  const trailerPlate = normalForm['trailerPlate'] !== undefined ? normalForm['trailerPlate'] : ''

  const pool = normalForm['pool'] !== undefined ? normalForm['pool'] : ''
  const poolColor = normalForm['pool'] !== undefined ? normalForm['pool'].color : ''

  const baseItems = normalForm['orderData'] !== undefined ? normalForm['orderData']['baseItems'] : ''
  const baseItemColors = normalForm['orderData'] !== undefined ? normalForm['orderData']['baseItemColors'] : ''
  const extraItems = normalForm['orderData'] !== undefined ? normalForm['orderData']['extraItems'] : ''
  const extraItemColors = normalForm['orderData'] !== undefined ? normalForm['orderData']['extraItemColors'] : ''
  const extraRaws = normalForm['orderData'] !== undefined ? normalForm['orderData']['extraRaws'] : ''
  const extraRawColors = normalForm['orderData'] !== undefined ? normalForm['orderData']['extraRawColors'] : ''

  const deliveryDate = normalForm ? normalForm.deliveryDate : ''
  const orderDate = normalForm ? normalForm.orderDate : ''
  const observations = normalForm['orderData'] ? normalForm['orderData'].observations : ''

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
  console.log(language)
  return (
    <Card className='invoice-preview-card'>
      <CardBody className='invoice-padding pb-0'>
        {/* Header */}
        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
          <div>
            <div className='logo-wrapper'>
              <img src={logos[logo - 1]} style={{ width: '300px' }} alt='logo' />
            </div>
            {
              Object.entries(info).map((inf) => <CardText className='mb-25'>{inf[1]}</CardText>)
            }
          </div>
          <div className='mt-md-0 mt-2'>
            <h4 className='invoice-title'>
              {(language !== undefined && language === 1) ? (`Entrega`) : (`Livraison`)} <span className='invoice-number'>#{id}</span>
            </h4>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>{(language !== undefined && language === 1) ? (`F. pedido:`) : (`D. commande:`)}</p>
              <p className='invoice-date'>{orderDate}</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>{(language !== undefined && language === 1) ? (`F. entrega:`) : (`D. livraison:`)}</p>
              <p className='invoice-date'>{deliveryDate}</p>
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
            <h6 className='mb-2'>{(language !== undefined && language === 1) ? (`Datos del receptor:`) : (`Données du récepteur:`)}</h6>
            <h6 className='mb-25'>{customerName}</h6>
            <CardText className='mb-25'>{deliveryAddress}</CardText>
            <CardText className='mb-25'>{phone}</CardText>
            <CardText className='mb-25'>{email}</CardText>
          </Col>
          <Col className='p-0 mt-xl-0 mt-2' lg='4'>
            <h6 className='mb-2'>{(language !== undefined && language === 1) ? (`Transportista:`) : (`Transporteur:`)}</h6>
            <table>
              <tbody>
                <tr>
                  <td className='pr-1'>{(language !== undefined && language === 1) ? (`Nombre:`) : (`Nom:`)}</td>
                  <td>
                    <span className='font-weight-bolder'>{carrierName}</span>
                  </td>
                </tr>
                <tr>
                  <td className='pr-1'>NIF: </td>
                  <td>{carrierNIF}</td>
                </tr>
                <tr>
                  <td className='pr-1'>{(language !== undefined && language === 1) ? (`Matrícula:`) : (`Inscription:`)} </td>
                  <td>{vehiclePlate} ( {trailerPlate} )</td>
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
            <th className='py-1'>{(language !== undefined && language === 1) ? (`Pedido`) : (`Commande`)}</th>
            {/* <th className='py-1'>Base</th>
            <th className='py-1'>IVA</th>
            <th className='py-1'>Cantidad</th>
            <th className='py-1'>Total</th> */}
          </tr>
        </thead>
        <tbody>

          <tr className='border-bottom'>
            <td className='py-1'>
              <p className='card-text font-weight-bold mb-50'>{pool[poolNames[logo - 1]]} ({poolColor})</p>
              {
                (baseItems !== undefined && baseItems !== '') && baseItems.map(obj => {
                  return (
                    (obj.show === 2 &&
                      (<p className='card-text text-nowrap' style={{ 'font-size': '11px' }}>
                        - {obj.name}
                      </p>))
                  )
                })
              }

              {
                (baseItemColors !== undefined && baseItemColors !== '') && baseItemColors.map(obj => {
                  return (
                    (obj.show === 2 &&
                      (<p className='card-text text-nowrap' style={{ 'font-size': '11px' }}>
                        - {obj.name} {obj.idColor.name !== undefined && (`(${obj.idColor.name})`)}
                      </p>))
                  )
                })
              }
            </td>
            {/* <td className='py-1'>
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
            </td> */}
          </tr>

          {
            (extraItems !== undefined && extraItems !== '') && extraItems.map(obj => {
              return (
                (obj.idItem.show.id === 2 &&
                  (
                    <tr className='border-bottom'>
                      <td className='py-1'>
                        <p className='card-text text-nowrap' style={{ 'font-size': '11px' }}>
                          - {obj.idItem.name}
                        </p>
                      </td>
                    </tr>
                  ))
              )
            })
          }
          {
            (extraRaws !== undefined && extraRaws !== '') && extraRaws.map(obj => {
              return (
                (obj.idItem.show.id === 2 &&
                  (
                    <tr className='border-bottom'>
                      <td className='py-1'>
                        <p className='card-text text-nowrap' style={{ 'font-size': '11px' }}>
                          - {obj.idItem.name}
                        </p>
                      </td>
                    </tr>
                  )
                ))
            })
          }
          {
            (extraItemColors !== undefined && extraItemColors !== '') && extraItemColors.map(obj => {
              return (
                (obj.idItem.show.id === 2 &&
                  (
                    <tr className='border-bottom'>
                      <td className='py-1'>
                        <p className='card-text text-nowrap' style={{ 'font-size': '11px' }}>
                          - {obj.idItem.name} {obj.idColor.name !== undefined && (`(${obj.idColor.name})`)}
                        </p>
                      </td>
                    </tr>
                  )
                ))
            })
          }
          {
            (extraRawColors !== undefined && extraRawColors !== '') && extraRawColors.map(obj => {
              return (
                (obj.idItem.show.id === 2 &&
                  (
                    <tr className='border-bottom'>
                      <td className='py-1'>
                        <p className='card-text text-nowrap' style={{ 'font-size': '11px' }}>
                          - {obj.idItem.name} {obj.idColor.name !== undefined && (`(${obj.idColor.name})`)}
                        </p>
                      </td>
                    </tr>
                  )
                ))
            })
          }

        </tbody>
      </Table>
      {/* /Invoice Description */}

      {/* Total & Sales Person */}
      <CardBody className='invoice-padding pb-0'>
        <Row className='invoice-sales-total-wrapper'>
          <Col className='d-flex justify-content-center' md='12' order={{ md: 12, lg: 12 }}>
            {
              (normalForm['signature'] !== undefined && normalForm['signature'] !== '' && normalForm['signature'] !== null) ?
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
          {/* <Col className='d-flex justify-content-end' md='4' order={{ md: 6, lg: 4 }}>
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
          </Col> */}
        </Row>
      </CardBody>
      {/* /Total & Sales Person */}

      <hr className='invoice-spacing' />

      {/* Invoice Note */}
      <CardBody className='invoice-padding pt-0'>
        <Row>
          <Col sm='12'>
            <span>
              {observations}
            </span>
          </Col>
        </Row>
      </CardBody>
      {/* /Invoice Note */}
    </Card >
  )
}

export default PreviewCard
