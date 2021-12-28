const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    try {
        const token = req.header('x-token').replace(/['"]+/g, '');
        if (!token) {
            res.status(401).json({
                ok: false,
                msg: 'No hay token en la petición'
            })
        }

        if (jwt.verify(token, process.env.JWT_SECRET)) {
            next()
        } else {
            res.status(401).json({
                ok: false,
                msg: 'Token no válido'
            })
        }
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

}


module.exports = {
    validarJWT
}