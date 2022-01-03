import axios from "axios"

export const ValidateToken = async (email, token) => {
    const { data } = await axios.post(`${process.env.REACT_APP_HOST_URI}/users/checkToken`, { email, token })
    return data && data.ok
}