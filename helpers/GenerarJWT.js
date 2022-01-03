const jwt = require('jsonwebtoken');

const GenerarJWT = (id, sheed) => {

    return new Promise((resolve, reject) => {

        jwt.sign({ id }, sheed, { expiresIn: '30m' }, (err, token) => {
            if (err) {
                console.log(err)
                reject('No se pudo generar el token')
            }
            resolve(token)
        })
    })
}


const PassRecoveryJWT = (email, sheed) => {

    return new Promise((resolve, reject) => {

        jwt.sign({ email }, sheed, { expiresIn: '10m' }, (err, token) => {
            if (err) {
                console.log(err)
                reject('No se pudo generar el token')
            }
            resolve(token)
        })
    })
}


module.exports = {
    GenerarJWT,
    PassRecoveryJWT
}