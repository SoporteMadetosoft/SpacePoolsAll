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
        priceVATout,
        priceVATin,
        cost,
        simultaneousFabrications,
        observations,
        idStatus
    }) {
        this.id = id
        this.poolCode = poolCode
        this.nameEuropa = nameEuropa
        this.nameSpace = nameSpace
        this.nameSociedad = nameSociedad
        this.nameHydrius = nameHydrius
        this.fabricationName = fabricationName
        this.priceVATout = priceVATout
        this.priceVATin = priceVATin
        this.cost = cost
        this.simultaneousFabrications = simultaneousFabrications
        this.observations = observations
        this.idStatus = idStatus
    }
    get table() {
        return this.#table;
    }
}
module.exports = Pool