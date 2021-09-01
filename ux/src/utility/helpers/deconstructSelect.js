

export const deconstructSelect = (obj) => {
    return {
        label: obj.name,
        value: obj.id
    }
}

export const constructSelect = (obj) => {
    return {
        name: obj.label,
        id: obj.value
    }
}