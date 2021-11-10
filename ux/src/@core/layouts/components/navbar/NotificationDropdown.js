// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, X, Check, AlertTriangle } from 'react-feather'
import {
  Button,
  Badge,
  Media,
  CustomInput,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'
import { getNotificationDropDown } from '../../../../utility/helpers/Axios/getNotificationDropDown'

const NotificationDropdown = () => {
  // ** Notification Array
  const [notification, setNotification] = useState([])
  

  useEffect(() => {

      getNotificationDropDown('Alerts').then(setNotification)
    
  }, [])
  

  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false
        }}
      >
        {notification.length !== undefined && notification.map((item, index) => {
          return (
              <Media
                className={classnames('d-flex')}
              >
                
                  <Fragment>
                    <Media left>
                      
                    </Media>
                    <Media className="font-weight-bolder black" body>
                      {item.title}
                      <small className='notification-text'>{item.subtitle}</small>
                    </Media>
                  </Fragment>
                
              </Media>
          )
        })}
      </PerfectScrollbar>
    )
  }
  /*eslint-enable */
  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item mr-25'>
      <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
        <Bell size={21} />
        {notification.length >= 1 ? <Badge pill color='danger' className='badge-up'>
        {notification.length}
        </Badge> : ''}
      </DropdownToggle>
      <DropdownMenu tag='ul' right className='dropdown-menu-media mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem className='d-flex' tag='div' header>
            <h4 className='notification-title mb-0 mr-auto'>Notifications</h4>
            <Badge tag='div' color='light-primary' pill>
              {notification.length}
            </Badge>
          </DropdownItem>
        </li>
        {renderNotificationItems()}
        <li className='dropdown-menu-footer'>
          <Button.Ripple color='primary' block>
            Leídas todas las notificaciones
          </Button.Ripple>
        </li>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
