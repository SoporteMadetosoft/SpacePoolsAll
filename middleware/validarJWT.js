const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    try {
        const token = req.header('x-token').replace(/['"]+/g, '');

        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'No hay token en la petición'
            })
        }

        const some = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

    } catch (error) {

        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    next()
}


module.exports = {
    validarJWT
}