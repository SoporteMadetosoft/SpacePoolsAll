const db = require('../dao/Connection.js');
const bcrypt = require('bcrypt');

const AuthDao = require('../dao/AuthDao.js');
const { GenerarJWT } = require('../helpers/GenerarJWT.js');
const saltRounds = 10;

const authDao = new AuthDao()

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        res.json({
            ok: true,
            data: await authDao.findUser(email, password)
        })
    } catch (error) {
        console.log(error)
        return res.json({
            ok: false,
            data: error
        });
    }
}

exports.register = async (req, res) => {
    try {
        const { email, fullname, username, password } = req.body;
        db.query('SELECT email FROM users WHERE email = ?', [email], async (err, result) => {
            if (result.length === 0) {
                bcrypt.hash(password, saltRounds).then((hash) => {
                    db.query('INSERT INTO users (email, username, fullname, password) VALUES (?, ?, ?, ?, ?)', [email, username, fullname, hash], async (err) => {
                        if (err) {
                            return res.status(500).send('Auth/Register -> Algo ha salido mal');
                        }
                    });
                });
                res.send({ message: "El registro se ha realizado correctamente" })
            } else {
                return res.status(401).send({ message: "El email introducido ya existe" });
            }
        });
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            data: error
        });
    }
}

exports.refreshToken = async (req, res) => {
    try {
        const { userData } = req.body
        if (userData) {
            const { id } = userData
            res.json({
                ok: true,
                data: {
                    accessToken: await GenerarJWT(id, process.env.JWT_SECRET)
                }
            })
        } else {
            res.json({
                ok: true,
                error: {
                    msg: 'No user data'
                }
            })
        }

    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            data: error
        });
    }
}
