import axios from "axios"
import { endPoints } from "@fixed/endPoints"
import { logMessages } from "@fixed/logMessages"
import { getUserData } from "../../../auth/utils"
import { dateTimeNow } from "../dateTimeNow"

export const saveLog = async (endPoint, action) => {
    const idUsuario = getUserData()
    const acciones = ['añadido', 'actualizado', 'eliminado', 'verificado']

    const message = logMessages[endPoint] !== undefined && `El usuario ${idUsuario.fullName} ha ${acciones[action]} ${logMessages[endPoint]}`

    if (message !== '') {
        const logDate = dateTimeNow('date')
        const logTime = dateTimeNow('time')

        const LogObject = {
            message,
            idUser: idUsuario.id,
            logDate,
            logTime
        }
        await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints['Logs']}/insert`, { LogObject })
    }

}