class Vehicles {
    repairs = []
    #table = 'vehicles'

    constructor({
        id,
        idCarrier,
        idTrailer,
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
        repairs = [],
        documents = []
    }) {
        this.id = id
        this.idCarrier = idCarrier
        this.idTrailer = idTrailer
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
        this.repairs = repairs
        this.filePath = filePath
        this.documents = documents
    }
    get table() {
        return this.#table;
    }
}
module.exports = Vehicles