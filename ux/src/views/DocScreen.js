import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

import { handleChangeUpload, handleLoadDocuments, saveFiles } from '../redux/actions/fileUpload'
import { CustomMiniTable } from '../components/datatable/CustomMiniTable'
import { FileContext } from '../utility/context/FileContext'
import { MkDir } from '../utility/helpers/Axios/MkDir'
import { DocSchema } from '../fixed/commons/DocSchema'

export const DocScreen = ({ endPoint, columns = DocSchema }) => {

    const { file, setFile } = useContext(FileContext)
    const dispatch = useDispatch()
    const { normalForm: formValues, fileUpload } = useSelector(state => state)
    const { documents, formFilePath } = formValues
    const { upload, filePath } = fileUpload

    const realFilePath = formFilePath ? formFilePath : filePath

    useEffect(() => {
        if (upload === 0 && realFilePath !== undefined) dispatch(handleLoadDocuments('FileManager', realFilePath))
    }, [upload])

    const handleFileInputChange = (e) => {
        setFile(e.target.files)
        const uploaded = e.target.files.length === 0 ? 0 : 1
        dispatch(handleChangeUpload(uploaded))
    }

    const uploadFileToCloud = async (e) => {
        e.preventDefault()
        const filePath2 = await MkDir(endPoint, realFilePath)
        dispatch(saveFiles('FileManager', filePath2 ? filePath2 : realFilePath, file))
    }

    return (
        <div className="card">
            <div className="card-header">
                <h1 className="card-title">Documentos</h1>
            </div>
            <div className="row pb-1 mx-1">
                <div className="col-md-5">
                    <input
                        className="form-control"
                        type="file"
                        id="formFileMultiple"
                        accept="application/msword, application/vnd.ms-Excel, application/vnd.ms-PowerPoint, text/plain, application/pdf, image/*"
                        multiple
                        onChange={handleFileInputChange}
                    />
                </div>
                {
                    upload === 1 &&
                    <div className="col-md-1">
                        <a type="button" id="uploadButton" onClick={uploadFileToCloud} class="btn btn-primary">
                            <FontAwesomeIcon icon={faUpload} />
                        </a>
                    </div>
                }
            </div>
            <CustomMiniTable columns={columns} data={documents} />
        </div>
    )
}
