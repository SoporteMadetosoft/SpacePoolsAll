class Pool{
    base = {}
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
        status
    }){
        this.base.id = id
        this.base.poolCode = poolCode
        this.base.nameEuropa = nameEuropa
        this.base.nameSpace = nameSpace
        this.base.nameSociedad = nameSociedad
        this.base.nameHydrius = nameHydrius
        this.base.fabricationName = fabricationName
        this.base.priceVATout = priceVATout
        this.base.priceVATin = priceVATin
        this.base.cost = cost
        this.base.simultaneousFabrications = simultaneousFabrications
        this.base.observations = observations
        this.base.status = status
    }
    get table() {
        return this.#table;
    }
}
module.exports = Pool