const Setup = require("../../models/setup/Setup");
const GenericDao = require("../GenericDao");

class SetupDao extends GenericDao {

    id
    nombre
    object
    objectAux
    constructor(object) {
        super(object)
        this.object = object
        this.objectAux = new this.object({})
    }

    async mountObj(data) {
        return new this.object(data)
    }

    async mountList(data) {
        return { ...data }

    }
}
module.exports = SetupDao