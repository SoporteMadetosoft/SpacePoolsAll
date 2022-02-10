import { handleCleanUp } from "../../redux/actions/fileUpload"
import { removeError } from "../../redux/actions/formValidator"
import { handleCleanForm } from "../../redux/actions/normalForm"
import { cleanSelectOptions } from '../../redux/actions/selects/index.js'


export const handleFullClean = (dispatch) => {
  dispatch(removeError())
  dispatch(handleCleanForm())
  dispatch(handleCleanUp())
  dispatch(cleanSelectOptions())
}
