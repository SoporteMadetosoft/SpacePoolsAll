class Vehicles{
    base = {}
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
    }){
        this.base.id = id
        this.base.carrierId = carrierId
        this.base.trailerId = trailerId
        this.base.model = model
        this.base.vehicleCode = vehicleCode
        this.base.plate = plate
        this.base.frameNumber = frameNumber
        this.base.tare = tare
        this.base.mma = mma
        this.base.ITVdate = ITVdate
        this.base.policyNumber = policyNumber
        this.base.insurnaceDateLimit = insurnaceDateLimit
        this.base.maintenanceDate = maintenanceDate
        this.base.tachograph = tachograph
        this.base.observations = observations
        this.base.status = status
        this.repairs = repairs
    }
    get table() {
        return this.#table;
    }
}
module.exports = Vehicles