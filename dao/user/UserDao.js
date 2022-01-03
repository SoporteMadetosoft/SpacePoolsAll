const User = require("../../models/user/User");
const GenericDao = require("../GenericDao");
const StatusDao = require("../global/StatusDao");
const RoleDao = require("../role/RoleDao");

const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserDao extends GenericDao {
    constructor() {
        super(User);
        this.StatusDao = new StatusDao()
        this.RoleDao = new RoleDao()
    }

    async mountObj(data) {
        const role = await this.RoleDao.findById(data.idRole)
        const user = {
            ...data,
            idStatus: await this.StatusDao.findById(data.idStatus),
            idRole: {
                id: role.id,
                name: role.name
            }
        }
        return new User(user)
    }

    async mountList(data) {
        const role = await this.RoleDao.findById(data.idRole)
        const list = {
            ...data,
            idRole: role !== undefined ? role.name : ''
        }

        const { id, fullname, login, idRole, idStatus } = list
        const nObj = { id, fullname: fullname, login: login, idRole: idRole, idStatus: idStatus }

        return nObj
    }


    checkUser(username) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT COUNT(*) as contador FROM users WHERE login = ?', [username], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    if (result[0].contador === 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            })
        })
    }

    checkEmail(email) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT COUNT(*) as contador FROM users WHERE email = ?', [email], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    if (result[0].contador === 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            })
        })
    }


    insertUser(form) {
        return new Promise((resolve, reject) => {
            const { login, fullname, email, phone, password, idRole, idStatus } = form
            bcrypt.hash(password, saltRounds).then((hash) => {
                this.db.query('INSERT INTO users (idRole, idStatus, fullname, login, email, phone, password) VALUES (?, ?, ?, ?, ?, ?, ?)', [idRole, idStatus, fullname, login, email, phone, hash], (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve('')
                    }
                })
            })
        })
    }

    updateUser(form) {
        return new Promise((resolve, reject) => {
            const { id, login, fullname, email, phone, password, idRole, idStatus } = form
            if (password) {
                bcrypt.hash(password, saltRounds).then((hash) => {
                    this.db.query('UPDATE users SET idRole = ?, idStatus = ?, fullname = ?, login = ?, email = ?, phone = ?, password = ? WHERE id = ?', [idRole, idStatus, fullname, login, email, phone, hash, id], (err, result) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve('')
                        }
                    })
                })
            } else {
                this.db.query('UPDATE users SET idRole = ?, idStatus = ?, fullname = ?, login = ?, email = ?, phone = ? WHERE id = ?', [idRole, idStatus, fullname, login, email, phone, id], (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve('')
                    }
                })
            }
        })
    }

    recoverPassword(form) {
        return new Promise((resolve, reject) => {
            const { email, password } = form
            if (password) {
                bcrypt.hash(password, saltRounds).then((hash) => {
                    this.db.query('UPDATE users SET password = ? WHERE email = ?', [hash, email], (err, result) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve('')
                        }
                    })
                })
            } else {
                reject('Error con el password')
            }
        })
    }

    async getUserByEmail(email) {
        return new Promise(async (resolve, reject) => {
            this.db.query(`SELECT * FROM users WHERE email = ?`, [email], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result[0])
                }
            })
        })
    }
}
module.exports = UserDao