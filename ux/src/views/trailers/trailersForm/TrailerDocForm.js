import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

import { handleChangeUpload, handleLoadDocuments, saveFiles } from '../../../redux/actions/fileUpload'
import { CustomMiniTable } from '../../../components/datatable/CustomMiniTable'
import { MkDir } from '../../../utility/helpers/Axios/MkDir'
import { handleStartEditing } from '../../../redux/actions/normalForm'
import { FileContext } from '../../../utility/context/FileContext'
import { trailersDocs } from '../../../fixed/vehicles/trailers/trailersDocs'

export const TrailerDocForm = () => {

    const { id } = useParams()

    const { file, setFile } = useContext(FileContext)
    const dispatch = useDispatch()
    const { upload, filePath } = useSelector(state => state.fileUpload)
    const { filePath: formFilePath, documents: data } = useSelector(state => state.normalForm)

    let realFilePath = formFilePath ? formFilePath : filePath

    useEffect(() => {
        if (upload === 0) {

            if (!id) {
                dispatch(handleLoadDocuments('FileManager', realFilePath))
            } else {
                dispatch(handleStartEditing('Trailers', id))
            }
        }
    }, [upload])

    const handleFileInputChange = (e) => {
        setFile(e.target.files)

        if (e.target.files.length === 0) {
            dispatch(handleChangeUpload(0))
        } else {
            dispatch(handleChangeUpload(1))
        }
    }

    const uploadFileToCloud = async (e) => {
        e.preventDefault()

        const filePath2 = await MkDir('Trailers', realFilePath)
        realFilePath = filePath2 ? filePath2 : filePath

        dispatch(await saveFiles('FileManager', realFilePath, file))
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
                    upload === 1 ?
                        <div className="col-md-1">
                            <a type="button" id="uploadButton" onClick={uploadFileToCloud} class="btn btn-primary">
                                <FontAwesomeIcon icon={faUpload} />
                            </a>
                        </div>
                        : null
                }

            </div>
            <CustomMiniTable columns={trailersDocs} data={data} />
        </div>
    )
}
