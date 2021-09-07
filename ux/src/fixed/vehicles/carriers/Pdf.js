import React from 'react'
import DocViewer from "react-doc-viewer"

const docs = [
  {
    uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
]

export const Pdf = () => {
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>



      <DocViewer documents={docs} />
      {/* <FileViewer fileType={type} filePath={file} /> */}


      {/* <FileViewer
        fileType={type}
        filePath={file}
      // filePath='https://eqpro.es/wp-content/uploads/2018/11/Ejemplo.pdf'
      /> */}
    </div>
  )
}
