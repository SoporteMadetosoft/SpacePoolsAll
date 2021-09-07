import { FileText, MoreVertical, Trash } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { startDeleteRegister } from "@redux/actions/custom"
import { Link } from "react-router-dom"
import FileViewer from 'react-file-viewer'


import React, { Component } from 'react'

//class Pdf extends Component {
//
//    render() {
//        return (
//            <div style={{position: 'absolute', width: '100%', height: '100%'}}>
//                <object
//                data={require('./pdf.pdf')}
//                type="pdf"
//                width="100%"
//                height="100%"
//                >
//                </object>
//            </div>
//        )
//    }
//}

class Pdf extends Component {
    render() {
        return (
        <FileViewer
          fileType="pdf"
          filePath='./pdf.pdf'
          //filePath='https://eqpro.es/wp-content/uploads/2018/11/Ejemplo.pdf'
/>
      )
    }

}


export default Pdf