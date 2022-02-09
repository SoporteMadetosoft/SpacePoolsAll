import { getUserData } from "../Utils"

export const handleAbilityCheck = (can) => {

    const ability = getUserData()

    const report = ability !== null && ability.ability.find((a) => a.subject === can)

    return (report && report.id === window.btoa(can))
}