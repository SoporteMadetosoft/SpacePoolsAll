

export const GetColumnsList = () => {
    const { data } = await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/getEvents`, { calendars }, {
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        }
    })

    return data.data
}
