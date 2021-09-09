class Pool {
    #table = 'pool'

    constructor({
        id,
        poolCode,
        nameEuropa,
        nameSpace,
        nameSociedad,
        nameHydrius,
        fabricationName,
        price,
        cost,
        simultaneousFabrications,
        observations,
        idStatus,
        items = [],
        raws = []
    }) {
        this.id = id
        this.poolCode = poolCode
        this.nameEuropa = nameEuropa
        this.nameSpace = nameSpace
        this.nameSociedad = nameSociedad
        this.nameHydrius = nameHydrius
        this.fabricationName = fabricationName
        this.price = price
        this.cost = cost
        this.simultaneousFabrications = simultaneousFabrications
        this.observations = observations
        this.idStatus = idStatus
        this.items = items
        this.raws = raws
    }
    get table() {
        return this.#table;
    }
}
module.exports = Pool