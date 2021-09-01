class Vehicles {
    repairs = []
    #table = 'vehicles'

    constructor({
        id,
        carrierId,
        trailerId,
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
        status,
        repairs = []
    }) {
        this.id = id
        this.carrierId = carrierId
        this.trailerId = trailerId
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
        this.status = status
        this.repairs = repairs
    }
    get table() {
        return this.#table;
    }
}
module.exports = Vehicles