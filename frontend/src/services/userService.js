import api from "./api"

export const updateProfile = async (profileData) => {
    const response = await api.patch("/user/profile", profileData)
    return response.data.user
}
