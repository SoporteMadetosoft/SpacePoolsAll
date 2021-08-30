class Trailer {
    base = {}
    repairs = []
    #table = 'trailer'

    constructor({
        id,
        brand,
        model,
        trailerCode,
        plate,
        ITVdate,
        policyNumber,
        insuranceNumber,
        insuranceDateLimit,
        maintenanceDate,
        observations,
        idStatus,
        repairs = []
    }) {
        this.base.id = id
        this.base.brand = brand
        this.base.model = model
        this.base.trailerCode = trailerCode
        this.base.plate = plate
        this.base.ITVdate = ITVdate
        this.base.policyNumber = policyNumber
        this.base.insuranceNumber = insuranceNumber
        this.base.insuranceDateLimit = insuranceDateLimit
        this.base.maintenanceDate = maintenanceDate
        this.base.observations = observations
        this.base.idStatus = idStatus
        this.repairs = repairs
    }
    get table() {
        return this.#table;
    }
}
module.exports = Trailer