const dbCon = require("./Connection");
const StatusDao = require("./global/StatusDao");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const RoleDao = require("./role/RoleDao");

class AuthDao {
    db = dbCon

    constructor() {
        this.StatusDao = new StatusDao()
        this.RoleDao = new RoleDao()
    }
    findUser(email, password) {
        return new Promise((resolve, reject) => {
            if (!email || !password) {
                reject('controller Auth->Login(): Los campos estan vacios');
            }
            this.db.query('SELECT id, fullname as fullName, phone, email, password, idRole, idStatus FROM users WHERE login = ? ', [email], async (err, result) => {
                if (result.length === 0) {
                    reject('El usuario o contraseña es incorrecto');
                } else {
                    if (!(await bcrypt.compare(password, result[0].password)) === true) {
                        reject('El usuario o contraseña es incorrecto');
                    } else {
                        if (result[0].idStatus !== 2) {
                            reject('El usuario ha sido bloqueado');
                        } else {
                            delete result[0].password
                            resolve(await this.mountObj(result[0]))
                        }
                    }
                }
            })
        })
    }

    async mountObj(data) {

        const role = await this.RoleDao.findById(data.idRole)
        const roleName = role.name
        const { productionStatus } = role

        delete role.id
        delete role.name
        delete role.productionStatus

        const accessToken = jwt.sign({ id: data.id }, process.env.JWT_SECRET)
        const refreshToken = jwt.sign({ id: data.id }, process.env.JWT_SECRET_REFRESH)
        // ability: [{action: 'manage', subject: 'all'}]
        const user = {
            userData: {
                ...data,
                role: roleName,
                ability: this.tratarRole(role),
                productionStatus
            },
            accessToken,
            refreshToken
        }
        return user
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }

    tratarRole(role) {
        const newObjectRole = []
        Object.entries(role).map(el => {
            Object.entries(el[1]).map(perm => {
                if (perm[1] === true) {
                    newObjectRole.push({ subject: this.capitalizeFirstLetter(el[0]), action: perm[0] })
                }
            })
        })
        return newObjectRole
    }
}

module.exports = AuthDao