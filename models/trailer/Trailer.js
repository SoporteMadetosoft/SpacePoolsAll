class Trailer{
    base={}
    repairs = []
    #table = 'trailer'

    constructor({
        id,
        model,
        trailerCode,
        plate,
        ITVdate,
        policyNumber,
        insuranceNumber,
        insuranceDateLimit,
        maintenanceDate,
        observations,
        status,
        repairs =[]
    }){
        this.base.id = id
        this.base.model = model
        this.base.trailerCode = trailerCode
        this.base.plate = plate
        this.base.ITVdate = ITVdate
        this.base.policyNumber = policyNumber
        this.base.insuranceNumber = insuranceNumber
        this.base.insuranceDateLimit = insuranceDateLimit
        this.base.maintenanceDate = maintenanceDate
        this.base.observations = observations
        this.base.status = status
        this.repairs = repairs
    }
    get table() {
        return this.#table;
    }
}
module.exports = Trailer