class Vehicles {
    #table = 'vehicles'
    repairs = []

    constructor({
        id,
        idCarrier,
        idTrailer,
        brand,
        model,
        vehicleCode,
        plate,
        frameNumber,
        tare,
        mma,
        ITVdate,
        policyNumber,
        insurnaceDateLimit,
        maintenanceDate,
        tachograph,
        observations,
        idStatus,
        filePath,
        documents = [],
        repairs = []
    }) {
        this.id = id
        this.idCarrier = idCarrier
        this.idTrailer = idTrailer
        this.brand = brand
        this.model = model
        this.vehicleCode = vehicleCode
        this.plate = plate
        this.frameNumber = frameNumber
        this.tare = tare
        this.mma = mma
        this.ITVdate = ITVdate
        this.policyNumber = policyNumber
        this.insurnaceDateLimit = insurnaceDateLimit
        this.maintenanceDate = maintenanceDate
        this.tachograph = tachograph
        this.observations = observations
        this.idStatus = idStatus
        this.filePath = filePath
        this.documents = documents
        this.repairs = repairs
    }
    get table() {
        return this.#table;
        
    }
}
module.exports = Vehicles