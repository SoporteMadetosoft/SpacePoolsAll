import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

import { handleChangeUpload, saveFiles } from '../../../redux/actions/fileUpload'
import { carriersDocs } from '../../../fixed/vehicles/carriers/carriersDocs'
import { CustomMiniTable } from '../../../components/datatable/CustomMiniTable'
import { FileContext } from './FileContext'
import { MkDir } from '../../../utility/helpers/MkDir'

export const DocForm = () => {

    const { file, setFile } = useContext(FileContext)
    const dispatch = useDispatch()
    const { filePath, upload } = useSelector(state => state.fileUpload)
    const { documents: data } = useSelector(state => state.normalForm)

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

        const filePath2 = await MkDir(filePath)

        dispatch(await saveFiles('Carriers', filePath2, file))

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
            <CustomMiniTable columns={carriersDocs} data={data} />
        </div>
    )
}
