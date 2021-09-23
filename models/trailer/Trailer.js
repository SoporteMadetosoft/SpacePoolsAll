class Trailer {
    // repairs = []
    #table = 'trailer'

    constructor({
        id,
        brand,
        model,
        trailerCode,
        plate,
        frame,
        mma,
        ITVdate,
        policyNumber,
        insuranceNumber,
        insuranceDateLimit,
        maintenanceDate,
        observations,
        filePath,
        idStatus,
        // repairs = [],
        documents = []
    }) {
        this.id = id
        this.brand = brand
        this.model = model
        this.trailerCode = trailerCode
        this.plate = plate
        this.frame = frame
        this.mma = mma
        this.ITVdate = ITVdate
        this.policyNumber = policyNumber
        this.insuranceNumber = insuranceNumber
        this.insuranceDateLimit = insuranceDateLimit
        this.maintenanceDate = maintenanceDate
        this.observations = observations
        this.idStatus = idStatus
        // this.repairs = repairs
        this.filePath = filePath
        this.documents = documents
    }
    get table() {
        return this.#table;
    }
}
module.exports = Trailer