class Trailer {
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
        this.id = id
        this.brand = brand
        this.model = model
        this.trailerCode = trailerCode
        this.plate = plate
        this.ITVdate = ITVdate
        this.policyNumber = policyNumber
        this.insuranceNumber = insuranceNumber
        this.insuranceDateLimit = insuranceDateLimit
        this.maintenanceDate = maintenanceDate
        this.observations = observations
        this.idStatus = idStatus
        this.repairs = repairs
    }
    get table() {
        return this.#table;
    }
}
module.exports = Trailer