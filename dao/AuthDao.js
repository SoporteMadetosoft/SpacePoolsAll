const dbCon = require("./Connection");
const StatusDao = require("./global/StatusDao");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class AuthDao {
    db = dbCon

    constructor() {
        this.StatusDao = new StatusDao()
    }
    findUser(email, password) {
        return new Promise((resolve, reject) => {
            if (!email || !password) {
                reject('controller Auth->Login(): Los campos estan vacios');
            }
            this.db.query('SELECT id, fullname as fullName, phone, email, password, idRole, idStatus FROM users WHERE login = ? ', [email], async (err, result) => {
                if (!result || !(await bcrypt.compare(password, result[0].password)) || result[0].status === 0) {
                    reject('El usuario o contraseña es incorrecto');
                } else {
                    delete result[0].password
                    resolve(await this.mountObj(result[0]))
                }
            })
        })
    }

    async mountObj(data) {
        const accessToken = jwt.sign({ id: data.id }, process.env.JWT_SECRET)
        const refreshToken = jwt.sign({ id: data.id }, process.env.JWT_SECRET_REFRESH)
        const user = {
            userData: {
                ...data,
                role: 'admin',
                ability: [
                    {
                        action: 'manage',
                        subject: 'all'
                    }
                ]
                // role: await this.RoleDao.getAllRole(data.roleId)
            },
            accessToken,
            refreshToken
        }

        return user
    }
}

module.exports = AuthDao