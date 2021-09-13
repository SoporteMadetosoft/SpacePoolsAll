

export const deconstructSelect = (obj, labelName = 'name') => {
    return {
        label: obj[labelName],
        value: obj.id
    }
}

export const constructSelect = (obj) => {
    return {
        name: obj.label,
        id: obj.value
    }
}